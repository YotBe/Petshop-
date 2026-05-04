'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  CreditCard,
  Lock,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/store/cart-store';
import { track } from '@/lib/analytics';

type FormState = {
  email: string;
  phone: string;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};

type FieldKey = keyof FormState;

const REQUIRED: FieldKey[] = ['email', 'name', 'address', 'city', 'postalCode', 'country'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Permissive: digits + spaces/dashes/parens, 9-15 digits in total.
const PHONE_RE = /^[+]?[\s()\d-]{9,18}$/;
const REQUEST_TIMEOUT_MS = 15_000;

function validate(form: FormState): Partial<Record<FieldKey, string>> {
  const errors: Partial<Record<FieldKey, string>> = {};
  for (const k of REQUIRED) {
    if (!form[k].trim()) errors[k] = 'שדה חובה';
  }
  if (form.email && !EMAIL_RE.test(form.email.trim())) {
    errors.email = 'אימייל לא תקין';
  }
  if (form.phone && !PHONE_RE.test(form.phone.trim())) {
    errors.phone = 'מספר טלפון לא תקין';
  }
  if (form.postalCode && !/^\d{5,7}$/.test(form.postalCode.trim())) {
    errors.postalCode = 'מיקוד צריך 5–7 ספרות';
  }
  return errors;
}

function genId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `idem_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

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
  const { items, clear, subtotal } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [form, setForm] = useState<FormState>({
    email: '',
    phone: '',
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'ישראל'
  });

  // Stable per-mount idempotency key — server uses it to dedupe replays.
  const idempotencyKey = useRef<string>(genId());

  // Fire one analytics event when the user lands on checkout with items.
  const startedRef = useRef(false);
  useEffect(() => {
    if (startedRef.current || items.length === 0) return;
    startedRef.current = true;
    track('checkout_started', {
      itemCount: items.reduce((n, i) => n + i.quantity, 0),
      subtotal: subtotal()
    });
  }, [items, subtotal]);

  // Abandonment: log when the user leaves the checkout without submitting.
  const completedRef = useRef(false);
  useEffect(() => {
    function onLeave() {
      if (completedRef.current) return;
      if (items.length === 0) return;
      track('checkout_abandoned', {
        filledFields: Object.values(form).filter(Boolean).length,
        hasError: Object.keys(errors).length > 0
      });
    }
    window.addEventListener('pagehide', onLeave);
    return () => window.removeEventListener('pagehide', onLeave);
  }, [form, errors, items.length]);

  function update(k: FieldKey) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = { ...form, [k]: e.target.value };
      setForm(next);
      if (touched[k]) {
        const v = validate(next);
        setErrors(v);
      }
    };
  }

  function blur(k: FieldKey) {
    return () => {
      setTouched((t) => ({ ...t, [k]: true }));
      const v = validate(form);
      setErrors(v);
      if (v[k]) {
        track('checkout_field_invalid', { field: k, reason: v[k]! });
      }
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) return;
    if (submitting) return; // belt-and-suspenders against double-submit

    // Run a final validation pass and surface ALL errors before sending.
    const v = validate(form);
    setErrors(v);
    setTouched(
      REQUIRED.reduce(
        (acc, k) => ({ ...acc, [k]: true }),
        { phone: true } as Partial<Record<FieldKey, boolean>>
      )
    );
    if (Object.keys(v).length > 0) {
      setSubmitError('יש שגיאות בטופס. תקנו אותן ונסו שוב.');
      // Move focus to the first invalid field.
      const firstBad = REQUIRED.find((k) => v[k]) ?? 'phone';
      const el = document.getElementById(`checkout-${firstBad}`);
      el?.focus();
      return;
    }

    setSubmitError(null);
    setSubmitting(true);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'idempotency-key': idempotencyKey.current
        },
        body: JSON.stringify({ items, customer: form }),
        signal: controller.signal
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || `שגיאה ${res.status}`);
      }

      completedRef.current = true;
      track('checkout_completed', {
        orderId: data.orderId,
        total: data.amount
      });
      clear();
      router.push(`/checkout/success?order=${data.orderId}`);
    } catch (err) {
      const aborted = err instanceof Error && err.name === 'AbortError';
      const msg = aborted
        ? 'הבקשה ארכה זמן רב מדי. בדקו את החיבור ונסו שוב — שום חיוב לא בוצע.'
        : err instanceof Error
          ? err.message
          : 'התשלום נכשל. נסו שוב או פנו אלינו.';
      setSubmitError(msg);
      track('checkout_submit_failed', {
        reason: aborted ? 'timeout' : (err as Error).message ?? 'unknown'
      });
    } finally {
      clearTimeout(timer);
      setSubmitting(false);
    }
  }

  function FieldError({ field }: { field: FieldKey }) {
    if (!touched[field] || !errors[field]) return null;
    return (
      <p
        id={`checkout-${field}-err`}
        className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-red-600"
      >
        <AlertCircle className="h-3 w-3" /> {errors[field]}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {submitError && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">לא הצלחנו להשלים את ההזמנה</p>
            <p className="mt-1 leading-relaxed">{submitError}</p>
          </div>
        </div>
      )}

      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
        <h2 className="text-lg font-semibold">פרטי קשר</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="checkout-email" className="text-sm font-medium">
              אימייל
            </label>
            <Input
              id="checkout-email"
              type="email"
              required
              dir="ltr"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby={errors.email ? 'checkout-email-err' : undefined}
              value={form.email}
              onChange={update('email')}
              onBlur={blur('email')}
              placeholder="name@example.co.il"
              className="mt-1.5"
            />
            <FieldError field="email" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="checkout-phone" className="text-sm font-medium">
              טלפון{' '}
              <span className="text-slate-400 font-normal">
                (לעדכוני SMS — אופציונלי)
              </span>
            </label>
            <Input
              id="checkout-phone"
              type="tel"
              dir="ltr"
              inputMode="tel"
              autoComplete="tel"
              aria-invalid={Boolean(touched.phone && errors.phone)}
              aria-describedby={errors.phone ? 'checkout-phone-err' : undefined}
              value={form.phone}
              onChange={update('phone')}
              onBlur={blur('phone')}
              placeholder="050-123-4567"
              className="mt-1.5"
            />
            <FieldError field="phone" />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 md:p-6">
        <h2 className="text-lg font-semibold">כתובת למשלוח</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="checkout-name" className="text-sm font-medium">
              שם מלא
            </label>
            <Input
              id="checkout-name"
              required
              autoComplete="name"
              aria-invalid={Boolean(touched.name && errors.name)}
              aria-describedby={errors.name ? 'checkout-name-err' : undefined}
              value={form.name}
              onChange={update('name')}
              onBlur={blur('name')}
              className="mt-1.5"
            />
            <FieldError field="name" />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="checkout-address" className="text-sm font-medium">
              כתובת
            </label>
            <Input
              id="checkout-address"
              required
              autoComplete="street-address"
              aria-invalid={Boolean(touched.address && errors.address)}
              aria-describedby={errors.address ? 'checkout-address-err' : undefined}
              value={form.address}
              onChange={update('address')}
              onBlur={blur('address')}
              className="mt-1.5"
            />
            <FieldError field="address" />
          </div>
          <div>
            <label htmlFor="checkout-city" className="text-sm font-medium">
              עיר
            </label>
            <Input
              id="checkout-city"
              required
              autoComplete="address-level2"
              aria-invalid={Boolean(touched.city && errors.city)}
              aria-describedby={errors.city ? 'checkout-city-err' : undefined}
              value={form.city}
              onChange={update('city')}
              onBlur={blur('city')}
              className="mt-1.5"
            />
            <FieldError field="city" />
          </div>
          <div>
            <label htmlFor="checkout-postalCode" className="text-sm font-medium">
              מיקוד
            </label>
            <Input
              id="checkout-postalCode"
              required
              dir="ltr"
              inputMode="numeric"
              autoComplete="postal-code"
              aria-invalid={Boolean(touched.postalCode && errors.postalCode)}
              aria-describedby={
                errors.postalCode ? 'checkout-postalCode-err' : undefined
              }
              value={form.postalCode}
              onChange={update('postalCode')}
              onBlur={blur('postalCode')}
              className="mt-1.5"
            />
            <FieldError field="postalCode" />
          </div>
          <div>
            <label htmlFor="checkout-country" className="text-sm font-medium">
              מדינה
            </label>
            <Input
              id="checkout-country"
              required
              autoComplete="country-name"
              aria-invalid={Boolean(touched.country && errors.country)}
              aria-describedby={errors.country ? 'checkout-country-err' : undefined}
              value={form.country}
              onChange={update('country')}
              onBlur={blur('country')}
              className="mt-1.5"
            />
            <FieldError field="country" />
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

      <section
        aria-label="הבטחות אבטחה"
        className="rounded-xl border border-slate-200 bg-cream p-5"
      >
        <ul className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <li className="flex items-start gap-2">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <span>
              <strong className="text-ink">תקשורת מוצפנת SSL</strong> · כל הפרטים
              עוברים בערוץ מוצפן end-to-end.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <span>
              <strong className="text-ink">תשלום תואם PCI-DSS</strong> · פרטי
              האשראי לא נשמרים אצלנו, רק אצל Stripe.
            </span>
          </li>
          <li className="flex items-start gap-2 sm:col-span-2">
            <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <span>
              <strong className="text-ink">החזרה מלאה תוך 30 יום</strong> · לא
              מרוצים? אנחנו אוספים את החבילה ומחזירים את התשלום במלואו.
            </span>
          </li>
        </ul>
      </section>

      <Button
        size="lg"
        type="submit"
        variant="accent"
        disabled={submitting || items.length === 0}
        className="w-full"
        aria-busy={submitting}
      >
        {submitting ? (
          <>
            <span
              aria-hidden
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
            />
            מעבדים את ההזמנה...
          </>
        ) : (
          'בצעו הזמנה'
        )}
      </Button>
    </form>
  );
}
