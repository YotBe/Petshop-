import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PRODUCTS } from '@/lib/products';
import type { CartItem } from '@/lib/types';

/**
 * Stripe checkout skeleton.
 *
 * 1. Validates cart against server-side product prices (never trust client prices).
 * 2. Creates a PaymentIntent with the calculated amount.
 * 3. Returns the client_secret so the frontend can confirm with Stripe.js.
 *
 * If STRIPE_SECRET_KEY isn't set, falls back to a mock order id so the MVP
 * flow stays runnable without credentials.
 */
export async function POST(req: Request) {
  try {
    const { items, customer } = (await req.json()) as {
      items: CartItem[];
      customer: Record<string, string>;
    };

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    let subtotal = 0;
    for (const item of items) {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (!product) {
        return NextResponse.json({ error: `Unknown product ${item.productId}` }, { status: 400 });
      }
      const qty = Math.max(1, Math.floor(item.quantity));
      subtotal += product.price * qty;
    }
    const shipping = subtotal > 5000 ? 0 : 599;
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
      currency: 'usd',
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
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
