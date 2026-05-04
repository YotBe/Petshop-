'use client';

import { useState } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      toast.success('יאללה, ברוכים הבאים למועדון!', {
        description: 'הקופון של 10% הנחה יישלח אליכם בדקות הקרובות.'
      });
      setEmail('');
      setSubmitting(false);
    }, 400);
  }

  return (
    <section className="bg-brand text-white">
      <div className="container py-14 md:py-16">
        <div className="grid items-center gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
              <Sparkles className="h-3.5 w-3.5" /> מועדון פטופיה
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

          <form
            onSubmit={handleSubmit}
            className="md:col-span-2 flex flex-col gap-3 sm:flex-row"
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
              placeholder="name@example.co.il"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 flex-1 bg-white text-ink placeholder:text-slate-400"
            />
            <Button
              type="submit"
              size="lg"
              variant="accent"
              disabled={submitting}
              className="shrink-0"
            >
              {submitting ? 'שולח...' : 'קבלו את הקופון'}
              {!submitting && <ArrowLeft className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
