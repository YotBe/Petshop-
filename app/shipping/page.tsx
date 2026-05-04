import type { Metadata } from 'next';
import Link from 'next/link';
import { Truck, RotateCcw, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'משלוחים והחזרות — פטשופ',
  description:
    'מדיניות משלוחים והחזרות של פטשופ: משלוח חינם מעל ₪249, יציאה מהמחסן בישראל תוך 24 שעות, החזרה ללא שאלות תוך 30 יום.'
};

const SHIPPING_HIGHLIGHTS = [
  { Icon: Truck, label: 'משלוח חינם', sub: 'בהזמנות מעל ₪249' },
  { Icon: Clock, label: 'יציאה תוך 24 שעות', sub: 'מהמחסן שלנו בישראל' },
  { Icon: MapPin, label: 'משלוח לכל הארץ', sub: '2–3 ימי עסקים בממוצע' },
  { Icon: RotateCcw, label: 'החזרה תוך 30 יום', sub: 'איסוף חינם, ללא שאלות' }
] as const;

export default function ShippingPage() {
  return (
    <>
      <section className="bg-cream border-b border-slate-200">
        <div className="container py-14 md:py-20 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            משלוחים והחזרות
          </p>
          <h1 className="mt-2 font-display text-3xl md:text-5xl font-extrabold text-ink leading-tight">
            הזמנו, נשלח, ואם משהו לא מתאים — נחזיר בלי תורים
          </h1>
          <p className="mt-4 text-slate-700 leading-relaxed">
            כל ההזמנות יוצאות מהמחסן שלנו בישראל ומגיעות מהר. אם משהו לא מתאים,
            הליך ההחזרה פשוט וחינם.
          </p>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SHIPPING_HIGHLIGHTS.map(({ Icon, label, sub }) => (
            <div
              key={label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)]"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <div className="mt-3 text-sm font-bold text-ink">{label}</div>
              <div className="mt-1 text-xs text-slate-500">{sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream">
        <div className="container py-16 md:py-20 max-w-3xl space-y-10">
          <article>
            <h2 className="text-xl md:text-2xl font-extrabold text-ink">
              משלוחים בישראל
            </h2>
            <ul className="mt-4 space-y-3 text-slate-700 leading-relaxed">
              <li>
                • <strong>משלוח עד הבית:</strong> 2–3 ימי עסקים. עלות{' '}
                <span className="num">₪29</span>, חינם בהזמנות מעל{' '}
                <span className="num">₪249</span>.
              </li>
              <li>
                • <strong>איסוף עצמי מנקודת חלוקה:</strong> 1–2 ימי עסקים.
                עלות <span className="num">₪19</span>.
              </li>
              <li>
                • <strong>זמן עיבוד:</strong> רוב ההזמנות יוצאות מהמחסן תוך
                24 שעות (ימי א׳–ה׳).
              </li>
              <li>
                • <strong>איזורים מרוחקים:</strong> ייתכן עיכוב של עד יום
                עסקים נוסף ביישובים מרוחקים.
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-xl md:text-2xl font-extrabold text-ink">
              החזרות והחלפות
            </h2>
            <ul className="mt-4 space-y-3 text-slate-700 leading-relaxed">
              <li>
                • <strong>תקופה:</strong> ניתן להחזיר או להחליף כל מוצר תוך
                30 יום מהקבלה.
              </li>
              <li>
                • <strong>מצב המוצר:</strong> חדש או באריזה מקורית. גם אם
                המוצר נפתח — צרו קשר ונמצא פתרון.
              </li>
              <li>
                • <strong>איסוף:</strong> אנחנו מארגנים את האיסוף מביתכם, ללא
                עלות, באמצעות שליח.
              </li>
              <li>
                • <strong>החזר כספי:</strong> תוך 7 ימי עסקים מקבלת המוצר
                במחסן, לאמצעי התשלום המקורי.
              </li>
            </ul>
          </article>

          <article>
            <h2 className="text-xl md:text-2xl font-extrabold text-ink">
              איך מתחילים החזרה?
            </h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              שולחים לנו הודעה בוואטסאפ או מייל עם מספר ההזמנה — ואנחנו דואגים
              לכל השאר תוך יום עסקים אחד.
            </p>
            <Button size="lg" variant="accent" asChild className="mt-5">
              <Link href="/contact">
                צרו קשר להחזרה <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </article>
        </div>
      </section>
    </>
  );
}
