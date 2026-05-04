import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PRODUCTS } from '@/lib/products';
import { allocateBundlePrices, getBundle } from '@/lib/bundles';
import { createOrder } from '@/lib/orders';
import { notifyOrderStatus } from '@/lib/notifications';
import type { CartItem, OrderLine } from '@/lib/types';

/**
 * In-memory dedupe of recent idempotency keys. Holds the response payload
 * so a retried submission gets back the same orderId without creating a
 * duplicate Order or charging twice. 5-minute TTL.
 *
 * For production swap to Redis/KV — this map resets on cold start and is
 * per-instance, which is enough to catch double-clicks within a session
 * but not concurrent retries across regions.
 */
const IDEMPOTENCY_TTL_MS = 5 * 60 * 1000;
const recentByKey = new Map<string, { at: number; payload: unknown }>();

function rememberIdempotent(key: string, payload: unknown) {
  recentByKey.set(key, { at: Date.now(), payload });
  if (recentByKey.size > 1000) {
    const cutoff = Date.now() - IDEMPOTENCY_TTL_MS;
    for (const [k, v] of recentByKey) {
      if (v.at < cutoff) recentByKey.delete(k);
    }
  }
}

function lookupIdempotent(key: string): unknown | null {
  const entry = recentByKey.get(key);
  if (!entry) return null;
  if (Date.now() - entry.at > IDEMPOTENCY_TTL_MS) {
    recentByKey.delete(key);
    return null;
  }
  return entry.payload;
}

/**
 * Stripe checkout (ILS).
 *
 * 1. Validates cart against server-side product prices, RE-DERIVING bundle
 *    line prices from the canonical BUNDLES table (clients can claim any
 *    bundleId; we never trust client `price`).
 * 2. Persists an Order row (mock in-memory for now).
 * 3. Fires the "order received" notification (best-effort; never blocks).
 * 4. Creates a PaymentIntent if Stripe is configured; otherwise returns
 *    a mock orderId so the success page still flows.
 */
export async function POST(req: Request) {
  try {
    const idemKey = req.headers.get('idempotency-key');
    if (idemKey) {
      const cached = lookupIdempotent(idemKey);
      if (cached) {
        return NextResponse.json(cached, {
          headers: { 'idempotency-replay': 'true' }
        });
      }
    }

    const { items, customer } = (await req.json()) as {
      items: CartItem[];
      customer: Record<string, string>;
    };

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'העגלה ריקה' }, { status: 400 });
    }

    let subtotal = 0;
    const lines: OrderLine[] = [];

    // Cache allocated maps so we don't recompute per item in the same bundle.
    const bundleAllocations = new Map<string, Map<string, number>>();

    for (const item of items) {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `מוצר לא ידוע ${item.productId}` },
          { status: 400 }
        );
      }
      const qty = Math.max(1, Math.floor(item.quantity));

      let unitPrice = product.price;
      let bundleId: string | undefined;
      let bundleTitle: string | undefined;

      if (item.bundleId) {
        const bundle = getBundle(item.bundleId);
        if (bundle) {
          let allocated = bundleAllocations.get(bundle.id);
          if (!allocated) {
            allocated = allocateBundlePrices(bundle);
            bundleAllocations.set(bundle.id, allocated);
          }
          const fromBundle = allocated.get(product.id);
          if (typeof fromBundle === 'number') {
            unitPrice = fromBundle;
            bundleId = bundle.id;
            bundleTitle = bundle.title;
          }
          // If product isn't part of the claimed bundle, fall through to
          // catalog price (no discount granted).
        }
      }

      subtotal += unitPrice * qty;
      lines.push({
        productId: product.id,
        title: product.title,
        quantity: qty,
        price: unitPrice,
        aliexpressUrl: product.aliexpressUrl,
        ...(bundleId ? { bundleId, bundleTitle } : {})
      });
    }

    const shipping = subtotal > 19900 ? 0 : 2499;
    const amount = subtotal + shipping;

    const order = createOrder({
      customer: {
        name: customer.name || '',
        email: customer.email || '',
        phone: customer.phone || undefined,
        address: customer.address || '',
        city: customer.city || '',
        postalCode: customer.postalCode || '',
        country: customer.country || 'ישראל'
      },
      lines,
      subtotal,
      shipping,
      total: amount
    });

    // Fire-and-forget notification — must not block checkout response.
    notifyOrderStatus(order, 'received').catch((err) => {
      console.error('[checkout] notifyOrderStatus failed:', err);
    });

    if (!process.env.STRIPE_SECRET_KEY) {
      const payload = {
        orderId: order.id,
        amount,
        clientSecret: null,
        mock: true
      };
      if (idemKey) rememberIdempotent(idemKey, payload);
      return NextResponse.json(payload);
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const intent = await stripe.paymentIntents.create(
      {
        amount,
        currency: 'ils',
        automatic_payment_methods: { enabled: true },
        metadata: { orderId: order.id, customerEmail: customer?.email ?? '' }
      },
      // Pass through to Stripe so duplicate retries hit Stripe's own dedupe.
      idemKey ? { idempotencyKey: idemKey } : undefined
    );

    const payload = {
      orderId: order.id,
      amount,
      clientSecret: intent.client_secret
    };
    if (idemKey) rememberIdempotent(idemKey, payload);
    return NextResponse.json(payload);
  } catch (err) {
    console.error('checkout error', err);
    return NextResponse.json({ error: 'שגיאה פנימית' }, { status: 500 });
  }
}
