'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/store/cart-store';

/**
 * Stripe Elements integration skeleton.
 *
 * In production, wrap with:
 *   import { Elements } from '@stripe/react-stripe-js';
 *   import { loadStripe } from '@stripe/stripe-js';
 *   const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
 *   <Elements stripe={stripePromise} options={{ clientSecret }}>
 *     <PaymentElement />
 *   </Elements>
 *
 * Then post the cart to /api/checkout to create a PaymentIntent and use the
 * returned client_secret to confirm payment with stripe.confirmPayment().
 */
export default function CheckoutForm() {
  const router = useRouter();
  const { items, clear } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'US'
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ items, customer: form })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout failed');
      // In production: use data.clientSecret with Stripe.js to confirm payment.
      clear();
      router.push(`/checkout/success?order=${data.orderId}`);
    } catch (err) {
      console.error(err);
      alert('Checkout failed. See console for details.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Contact</h2>
        <div className="mt-4">
          <label className="text-sm font-medium">Email</label>
          <Input type="email" required value={form.email} onChange={update('email')} placeholder="you@example.com" />
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Shipping address</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Full name</label>
            <Input required value={form.name} onChange={update('name')} />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm font-medium">Address</label>
            <Input required value={form.address} onChange={update('address')} />
          </div>
          <div>
            <label className="text-sm font-medium">City</label>
            <Input required value={form.city} onChange={update('city')} />
          </div>
          <div>
            <label className="text-sm font-medium">Postal code</label>
            <Input required value={form.postalCode} onChange={update('postalCode')} />
          </div>
          <div>
            <label className="text-sm font-medium">Country</label>
            <Input required value={form.country} onChange={update('country')} />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Payment</h2>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
            <Lock className="h-3.5 w-3.5" /> Secured by Stripe
          </span>
        </div>
        <div className="mt-4 rounded-md border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
          <div className="flex items-center gap-2 font-medium text-slate-700">
            <CreditCard className="h-4 w-4" /> Stripe Elements (PaymentElement) renders here
          </div>
          <p className="mt-2">
            Wire <code className="font-mono text-xs">@stripe/react-stripe-js</code> with the
            <code className="font-mono text-xs"> clientSecret</code> returned from
            <code className="font-mono text-xs"> /api/checkout</code>.
          </p>
        </div>
      </section>

      <Button size="lg" type="submit" disabled={submitting || items.length === 0} className="w-full">
        {submitting ? 'Processing…' : 'Place order'}
      </Button>
    </form>
  );
}
