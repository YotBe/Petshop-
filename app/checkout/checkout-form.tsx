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
 *   <Elements stripe={stripePromise} options={{ clientSecret, locale: 'he' }}>
 *     <PaymentElement />
 *   </Elements>
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
    country: 'ישראל'
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
      if (!res.ok) throw new Error(data.error || 'התשלום נכשל');
      clear();
      router.push(`/checkout/success?order=${data.orderId}`);
    } catch (err) {
      console.error(err);
      alert('התשלום נכשל. ראה פרטים בקונסול.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
        <h2 className="text-lg font-semibold">פרטי קשר</h2>
        <div className="mt-4">
          <label htmlFor="checkout-email" className="text-sm font-medium">אימייל</label>
          <Input
            id="checkout-email"
            type="email"
            required
            dir="ltr"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            value={form.email}
            onChange={update('email')}
            placeholder="name@example.co.il"
            className="mt-1.5"
          />
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
        <h2 className="text-lg font-semibold">כתובת למשלוח</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="checkout-name" className="text-sm font-medium">שם מלא</label>
            <Input
              id="checkout-name"
              required
              autoComplete="name"
              value={form.name}
              onChange={update('name')}
              className="mt-1.5"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="checkout-address" className="text-sm font-medium">כתובת</label>
            <Input
              id="checkout-address"
              required
              autoComplete="street-address"
              value={form.address}
              onChange={update('address')}
              className="mt-1.5"
            />
          </div>
          <div>
            <label htmlFor="checkout-city" className="text-sm font-medium">עיר</label>
            <Input
              id="checkout-city"
              required
              autoComplete="address-level2"
              value={form.city}
              onChange={update('city')}
              className="mt-1.5"
            />
          </div>
          <div>
            <label htmlFor="checkout-postal" className="text-sm font-medium">מיקוד</label>
            <Input
              id="checkout-postal"
              required
              inputMode="numeric"
              autoComplete="postal-code"
              value={form.postalCode}
              onChange={update('postalCode')}
              className="mt-1.5"
            />
          </div>
          <div>
            <label htmlFor="checkout-country" className="text-sm font-medium">מדינה</label>
            <Input
              id="checkout-country"
              required
              autoComplete="country-name"
              value={form.country}
              onChange={update('country')}
              className="mt-1.5"
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">תשלום</h2>
          <span className="inline-flex items-center gap-1 text-xs text-slate-500">
            <Lock className="h-3.5 w-3.5" /> מאובטח על ידי Stripe
          </span>
        </div>
        <div className="mt-4 rounded-md border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
          <div className="flex items-center gap-2 font-medium text-slate-700">
            <CreditCard className="h-4 w-4" /> כאן יטען Stripe Elements (PaymentElement)
          </div>
          <p className="mt-2">
            חברו את <code className="font-mono text-xs">@stripe/react-stripe-js</code> עם
            <code className="font-mono text-xs"> clientSecret</code> שמוחזר מ-
            <code className="font-mono text-xs"> /api/checkout</code>.
          </p>
        </div>
      </section>

      <Button
        size="lg"
        type="submit"
        variant="accent"
        disabled={submitting || items.length === 0}
        className="w-full"
      >
        {submitting ? 'מעבד...' : 'בצעו הזמנה'}
      </Button>
    </form>
  );
}
