import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PRODUCTS } from '@/lib/products';
import type { CartItem } from '@/lib/types';

/**
 * Stripe checkout skeleton (ILS).
 *
 * 1. Validates cart against server-side product prices.
 * 2. Creates a PaymentIntent with the calculated amount.
 * 3. Returns the client_secret so the frontend can confirm with Stripe.js.
 */
export async function POST(req: Request) {
  try {
    const { items, customer } = (await req.json()) as {
      items: CartItem[];
      customer: Record<string, string>;
    };

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'העגלה ריקה' }, { status: 400 });
    }

    let subtotal = 0;
    for (const item of items) {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (!product) {
        return NextResponse.json({ error: `מוצר לא ידוע ${item.productId}` }, { status: 400 });
      }
      const qty = Math.max(1, Math.floor(item.quantity));
      subtotal += product.price * qty;
    }
    // Free shipping over ₪199; otherwise ₪24.99 flat.
    const shipping = subtotal > 19900 ? 0 : 2499;
    const amount = subtotal + shipping;

    const orderId = `ord_${Date.now().toString(36)}`;

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        orderId,
        amount,
        clientSecret: null,
        mock: true,
        customer
      });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const intent = await stripe.paymentIntents.create({
      amount,
      currency: 'ils',
      automatic_payment_methods: { enabled: true },
      metadata: { orderId, customerEmail: customer?.email ?? '' }
    });

    return NextResponse.json({
      orderId,
      amount,
      clientSecret: intent.client_secret
    });
  } catch (err) {
    console.error('checkout error', err);
    return NextResponse.json({ error: 'שגיאה פנימית' }, { status: 500 });
  }
}
