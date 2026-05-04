import { Search, Truck, Heart } from 'lucide-react';

const PILLARS = [
  {
    Icon: Search,
    title: 'בחירה אישית',
    body: 'כל מוצר נבדק על ידנו לפני שהוא נכנס לחנות. אם לא היינו קונים אותו לכלב שלנו — הוא לא כאן.'
  },
  {
    Icon: Truck,
    title: 'משלוח מהיר מהארץ',
    body: 'המלאי מאוחסן בישראל. רוב ההזמנות יוצאות תוך 24 שעות.'
  },
  {
    Icon: Heart,
    title: 'תמיכה אנושית',
    body: 'צוות בעברית בוואטסאפ — עוזרים לבחור מידה, להחליף מוצר ולענות על כל שאלה.'
  }
] as const;

export default function WhyUs() {
  return (
    <section className="bg-cream">
      <div className="container py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            למה דווקא אנחנו
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-ink">
            חנות אחת, שלוש הבטחות
          </h2>
          <p className="mt-2 text-slate-600">
            הקמנו את פטופיה כי לא מצאנו את החנות הזאת בעצמנו. אלו העקרונות
            שמנחים אותנו בכל מוצר ובכל הזמנה.
          </p>
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
  );
}
