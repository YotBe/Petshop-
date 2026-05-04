import type { Metadata } from 'next';
import { Mail, MessageCircle, Clock } from 'lucide-react';
import ContactForm from './contact-form';

export const metadata: Metadata = {
  title: 'צרו קשר — פטופיה',
  description:
    'יש שאלה על מידה, מוצר, משלוח או החזרה? צוות פטופיה זמין בעברית בוואטסאפ, במייל או דרך טופס יצירת קשר. נחזור אליכם תוך יום עסקים אחד.'
};

const CHANNELS = [
  {
    Icon: MessageCircle,
    label: 'וואטסאפ',
    value: '050-0000000',
    href: 'https://wa.me/972500000000',
    note: 'הכי מהיר — מענה תוך דקות בשעות הפעילות'
  },
  {
    Icon: Mail,
    label: 'אימייל',
    value: 'hello@petopia.co.il',
    href: 'mailto:hello@petopia.co.il',
    note: 'תשובה תוך יום עסקים אחד'
  },
  {
    Icon: Clock,
    label: 'שעות פעילות',
    value: 'א׳–ה׳ 9:00–18:00',
    href: undefined,
    note: 'בשבת וחג נחזור אליכם ביום הראשון'
  }
] as const;

const FAQ = [
  {
    q: 'כמה זמן לוקח המשלוח?',
    a: 'בממוצע 2–3 ימי עסקים. משלוח חינם בהזמנות מעל ₪249, אחרת ₪29.'
  },
  {
    q: 'אפשר להחזיר מוצר?',
    a: 'כן. אפשר להחזיר תוך 30 יום, ללא שאלות. אנחנו מארגנים את האיסוף ומחזירים את התשלום במלואו.'
  },
  {
    q: 'איך לבחור מידה לרתמה?',
    a: 'מודדים את היקף החזה במטר חייט (מאחורי הרגליים הקדמיות) ומשווים לטבלת המידות שמופיעה בעמוד המוצר. אם מתלבטים — שלחו לנו תמונה בוואטסאפ ונעזור.'
  },
  {
    q: 'האם המחירים כוללים מע״מ?',
    a: 'כן. כל המחירים באתר כבר כוללים מע״מ ואין הפתעות בקופה.'
  }
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-cream border-b border-slate-200">
        <div className="container py-14 md:py-20 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            צרו קשר
          </p>
          <h1 className="mt-2 font-display text-3xl md:text-5xl font-extrabold text-ink leading-tight">
            כאן בשביל לעזור — בעברית, בלי תורים
          </h1>
          <p className="mt-4 text-slate-700 leading-relaxed">
            יש שאלה על מידה, מוצר, משלוח או החזרה? בחרו את הערוץ הכי נוח לכם.
            אנחנו אנשים אמיתיים, ואנחנו עונים מהר.
          </p>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {CHANNELS.map(({ Icon, label, value, href, note }) => {
            const inner = (
              <>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Icon className="h-6 w-6" />
                </span>
                <div className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  {label}
                </div>
                <div className="mt-1 font-display text-lg font-extrabold text-ink">
                  {value}
                </div>
                <p className="mt-2 text-sm text-slate-600">{note}</p>
              </>
            );
            const cardClass =
              'block rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)] transition hover:shadow-[0_8px_28px_-8px_rgba(15,23,42,0.18)]';
            return href ? (
              <a key={label} href={href} className={cardClass}>
                {inner}
              </a>
            ) : (
              <div key={label} className={cardClass}>
                {inner}
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-cream">
        <div className="container py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                שאלות נפוצות
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-ink">
                המידע שהכי שאלו אותנו
              </h2>
              <div className="mt-6 space-y-3">
                {FAQ.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_12px_-6px_rgba(15,23,42,0.08)]"
                  >
                    <summary className="cursor-pointer list-none font-semibold text-ink flex items-center justify-between gap-3">
                      <span>{item.q}</span>
                      <span
                        aria-hidden
                        className="text-accent transition group-open:rotate-45 text-xl leading-none"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
