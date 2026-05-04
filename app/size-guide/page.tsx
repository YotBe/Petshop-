import type { Metadata } from 'next';
import Link from 'next/link';
import { Ruler, MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'מדריך מידות לרתמות וצווארונים — פטשופ',
  description:
    'איך מודדים את היקף החזה והצוואר של הכלב ובוחרים מידה נכונה לרתמה: שלושה צעדים פשוטים, טבלת מידות מלאה, וטיפים שיחסכו לכם החלפה.'
};

const SIZE_TABLE = [
  { size: 'S', chest: '40–50 ס״מ', neck: '28–38 ס״מ', weight: '7–14 ק״ג' },
  { size: 'M', chest: '50–66 ס״מ', neck: '38–48 ס״מ', weight: '14–27 ק״ג' },
  { size: 'L', chest: '66–81 ס״מ', neck: '48–58 ס״מ', weight: '27–41 ק״ג' },
  { size: 'XL', chest: '81–102 ס״מ', neck: '58–68 ס״מ', weight: '41–59 ק״ג' }
];

const STEPS = [
  {
    n: 1,
    title: 'מודדים היקף חזה',
    body: 'עוטפים מטר חייט סביב הגב, מאחורי הרגליים הקדמיות — בנקודה הרחבה ביותר. שומרים על מתח טבעי, לא לחנוק.'
  },
  {
    n: 2,
    title: 'מודדים היקף צוואר',
    body: 'מודדים סביב בסיס הצוואר, איפה שהקולר יושב בנוחות. מוסיפים מקום לשתי אצבעות בין המטר לפרווה.'
  },
  {
    n: 3,
    title: 'בודקים בטבלה',
    body: 'משווים בטבלה לפי היקף החזה (קודם) ואז המשקל. אם נופלים בין שתי מידות — תמיד עולים מידה.'
  }
];

export default function SizeGuidePage() {
  return (
    <>
      <section className="bg-cream border-b border-slate-200">
        <div className="container py-14 md:py-20 max-w-2xl">
          <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            <Ruler className="h-3.5 w-3.5" /> מדריך מידות
          </p>
          <h1 className="mt-2 font-display text-3xl md:text-5xl font-extrabold text-ink leading-tight">
            איך לבחור מידה נכונה — בלי לחזור לחנות
          </h1>
          <p className="mt-4 text-slate-700 leading-relaxed">
            שלושה צעדים פשוטים, מטר חייט אחד, ועוד שתי דקות מהזמן שלכם —
            ויש לכם רתמה במידה הנכונה כבר בהזמנה הראשונה.
          </p>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((s) => (
            <article
              key={s.n}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)]"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white font-display text-sm font-extrabold">
                <span className="num">{s.n}</span>
              </span>
              <h2 className="mt-4 text-lg font-bold text-ink">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-cream">
        <div className="container py-16 md:py-20 max-w-4xl">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-ink">
              טבלת מידות לרתמות
            </h2>
            <p className="mt-2 text-slate-600">
              היקף החזה הוא הפרמטר הקובע. המשקל ניתן רק כאומדן.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)]">
            <table className="w-full min-w-[520px] text-sm">
              <thead className="bg-slate-50 text-start text-slate-500">
                <tr>
                  <th className="px-4 py-3 text-start font-semibold">מידה</th>
                  <th className="px-4 py-3 text-start font-semibold">היקף חזה</th>
                  <th className="px-4 py-3 text-start font-semibold">היקף צוואר</th>
                  <th className="px-4 py-3 text-start font-semibold">משקל כלב</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_TABLE.map((row) => (
                  <tr key={row.size} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-bold text-ink">{row.size}</td>
                    <td className="px-4 py-3 text-slate-700">
                      <span className="num">{row.chest}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      <span className="num">{row.neck}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      <span className="num">{row.weight}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)]">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-bold text-ink">לא בטוחים? נעזור לבחור</h3>
                <p className="mt-1 text-sm text-slate-600">
                  שלחו לנו תמונה של הכלב והמידות בוואטסאפ — נמליץ תוך דקות.
                </p>
                <Button size="lg" variant="accent" asChild className="mt-4">
                  <Link href="/contact">
                    דברו איתנו <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
