'use client';

import { useState } from 'react';
import { Sparkles, ArrowLeft, Copy, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { track } from '@/lib/analytics';

type Success = {
  code: string;
  validUntil: string;
  alreadySubscribed: boolean;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<Success | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    if (!EMAIL_RE.test(email.trim())) {
      setError('אימייל לא תקין');
      return;
    }
    if (!consent) {
      setError('יש לאשר קבלת מיילים');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), consent })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `שגיאה ${res.status}`);
      setSuccess({
        code: data.code,
        validUntil: data.validUntil,
        alreadySubscribed: Boolean(data.alreadySubscribed)
      });
      track('newsletter_signup', { alreadySubscribed: !!data.alreadySubscribed });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שליחה נכשלה');
    } finally {
      setSubmitting(false);
    }
  }

  async function copyCode() {
    if (!success) return;
    try {
      await navigator.clipboard.writeText(success.code);
      setCopied(true);
      toast.success('הקוד הועתק');
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error('לא הצלחנו להעתיק — סמנו ידנית');
    }
  }

  return (
    <section className="bg-brand text-white">
      <div className="container py-14 md:py-16">
        <div className="grid items-center gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
              <Sparkles className="h-3.5 w-3.5" /> מועדון פטשופ
            </p>
            <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight md:text-3xl">
              מצטרפים למועדון? מקבלים <span className="num">10%</span> הנחה
              על ההזמנה הראשונה.
            </h2>
            <p className="mt-3 text-sm text-white/85 md:text-base">
              טיפים, מבצעים שווים והמלצות אישיות — ישר למייל. בלי ספאם, אפשר
              לבטל בכל עת.
            </p>
          </div>

          <div className="md:col-span-2">
            {success ? (
              <div className="rounded-xl bg-white p-5 text-ink shadow-lg">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                  {success.alreadySubscribed
                    ? 'הקוד שלכם'
                    : 'ברוכים הבאים למועדון!'}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {success.alreadySubscribed
                    ? 'הקוד שלכם נשמר אצלנו — תקף עד'
                    : 'שלחנו את הקוד גם למייל. תקף עד'}{' '}
                  <span className="num font-semibold text-ink">
                    {new Date(success.validUntil).toLocaleDateString('he-IL')}
                  </span>
                  .
                </p>
                <div className="mt-4 flex items-center gap-2 rounded-lg border-2 border-dashed border-accent bg-cream p-3">
                  <code
                    dir="ltr"
                    className="flex-1 select-all text-center font-mono text-lg font-extrabold tracking-wider text-ink"
                  >
                    {success.code}
                  </code>
                  <button
                    type="button"
                    onClick={copyCode}
                    aria-label="העתיקו קוד"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md text-brand hover:bg-brand/10 active:bg-brand/20 touch-manipulation"
                  >
                    {copied ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <p className="mt-3 text-xs text-slate-500 leading-relaxed">
                  השתמשו בקוד בקופה. הזמנה מינימלית ‎₪100, להזמנה ראשונה בלבד,
                  לא משולב עם הטבות אחרות.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-3"
                aria-label="הצטרפות לרשימת התפוצה"
              >
                <label htmlFor="newsletter-email" className="sr-only">
                  האימייל שלכם
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  required
                  dir="ltr"
                  inputMode="email"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="name@example.co.il"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full bg-white text-ink placeholder:text-slate-400"
                />
                <label className="flex items-start gap-2 text-xs text-white/85">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-accent"
                  />
                  <span>
                    אני מאשר/ת קבלת עדכונים והטבות במייל. ניתן לבטל בכל עת.
                  </span>
                </label>
                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-md bg-red-50 p-2.5 text-xs font-medium text-red-700"
                  >
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
                <Button
                  type="submit"
                  size="lg"
                  variant="accent"
                  disabled={submitting}
                  className="w-full"
                >
                  {submitting ? 'שולח...' : 'קבלו את הקופון'}
                  {!submitting && <ArrowLeft className="h-4 w-4" />}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
