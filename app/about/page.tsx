import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Search, Truck, Heart, Users, Star, PackageCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'אודות פטשופ — החנות שתמיד חיפשנו',
  description:
    'פטשופ היא חנות ישראלית לציוד פרימיום לחיות מחמד. אנחנו זוג ושני כלבים שהקימו את החנות שתמיד חיפשנו: ציוד עמיד שעובר בדיקה אישית, מחירים הוגנים ושירות בעברית.'
};

const PILLARS = [
  {
    Icon: Search,
    title: 'בחירה אישית',
    body: 'כל מוצר נבדק על ידנו לפני שהוא נכנס לחנות. אם לא היינו קונים אותו לכלב שלנו — הוא לא כאן.'
  },
  {
    Icon: Truck,
    title: 'משלוח מהיר מהארץ',
    body: 'המלאי מאוחסן בישראל. רוב ההזמנות יוצאות תוך 24 שעות, ומגיעות עד הבית בכל הארץ.'
  },
  {
    Icon: Heart,
    title: 'תמיכה אנושית',
    body: 'צוות בעברית בוואטסאפ — עוזרים לבחור מידה, להחליף מוצר ולענות על כל שאלה. בלי בוטים ובלי תורים.'
  }
] as const;

const STATS = [
  { Icon: Users, value: '12,000+', label: 'לקוחות מרוצים' },
  { Icon: Star, value: '4.8', label: 'דירוג ממוצע' },
  { Icon: PackageCheck, value: '24h', label: 'זמן יציאה ממחסן' }
] as const;

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <Image
          src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1920"
          alt="כלב על חוף הים"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-l from-slate-900/80 via-slate-900/40 to-transparent"
        />
        <div className="relative container py-20 md:py-28 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            אודות פטשופ
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.1] md:text-5xl">
            החנות שתמיד חיפשנו —
            <br />
            אז הקמנו אותה בעצמנו
          </h1>
          <p className="mt-5 text-lg text-slate-200 leading-relaxed">
            פטשופ היא חנות ישראלית לציוד פרימיום לחיות מחמד. אנחנו זוג עם
            שני כלבים שמאסו לרכוש ציוד שמתפרק אחרי חודש או להזמין מאתרים
            בחו״ל בלי לדעת מה יגיע.
          </p>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="grid items-start gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
              הסיפור שלנו
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-ink">
              התחיל מרתמה אחת שנקרעה
            </h2>
          </div>
          <div className="md:col-span-3 space-y-4 text-slate-700 leading-relaxed">
            <p>
              לפני שלוש שנים יצאנו עם בוקה, גולדן רטריבר בן שנה, לטיול בנחל.
              הרתמה החדשה — שעלתה לא מעט — נקרעה בעלייה הראשונה. חיפשנו
              חלופה איכותית בארץ ולא מצאנו. הזמנו מחו״ל וחיכינו חודש.
            </p>
            <p>
              באותו רגע הבנו שיש פה הזדמנות: לבחור בקפידה את הציוד הכי טוב,
              לאחסן אותו בישראל, ולתת ללקוחות מענה אנושי בעברית. אז עשינו את
              זה. כל מוצר שאנחנו מוכרים עובר אצלנו ניסוי בשטח לפני שהוא
              עולה לחנות.
            </p>
            <p>
              היום, אחרי אלפי הזמנות וחמש לקוחות חוזרות מתוך כל שש, אנחנו
              עדיין הזוג הזה עם השני כלבים — רק עם קצת יותר ניסיון בלקנות.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
              העקרונות שלנו
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-ink">
              שלוש הבטחות שלא משתנות
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PILLARS.map(({ Icon, title, body }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand text-white">
        <div className="container py-14 md:py-16">
          <div className="grid gap-8 sm:grid-cols-3">
            {STATS.map(({ Icon, value, label }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-accent">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <div className="font-display text-2xl font-extrabold leading-none">
                    <span className="num">{value}</span>
                  </div>
                  <div className="mt-1 text-sm text-white/85">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-ink">
          רוצים להכיר את הציוד?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          מאות לקוחות כבר הזמינו אצלנו השבוע. נשמח להיות הספר הבא של החיה
          האהובה שלכם.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button size="lg" variant="accent" asChild>
            <Link href="/products">
              התחילו לקנות <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">דברו איתנו</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
