import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

type Testimonial = {
  quote: string;
  author: string;
  city: string;
  pet: string;
  avatar: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'הזמנתי רתמת בטיחות לרכב לקיבי שלי, גולדן 32 ק״ג. הגיעה תוך יומיים, מידה מושלמת לפי הטבלה, והחגורה הרבה יותר רכה ממה שציפיתי. השירות בוואטסאפ עזר לי לבחור מידה. ממליצה בלב.',
    author: 'דנה מ.',
    city: 'תל אביב',
    pet: 'אמא של קיבי',
    avatar: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=200&h=200&fit=crop'
  },
  {
    quote:
      'קניתי קערה ומכל אחסון אוכל לחתולה שלנו. האיכות מצוינת, האוכל נשאר טרי, וההזמנה הגיעה מהר ובאריזה מקצועית. סופסוף חנות בעברית עם מענה אנושי כשצריך.',
    author: 'אורן ק.',
    city: 'חיפה',
    pet: 'אבא של ננה',
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop'
  },
  {
    quote:
      'רוקי בורדר קולי בן שנתיים — ענייני אנרגיה. סט הצעצועים והפריזבי ממש עזרו לי. הוא חוזר מהפארק עייף ומאושר וההמלצה הייתה בול. תודה ענקית על הליווי.',
    author: 'רוני ב.',
    city: 'מודיעין',
    pet: 'אמא של רוקי',
    avatar: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=200&h=200&fit=crop'
  }
];

function Stars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 מתוך 5 כוכבים">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function ReviewsWall() {
  return (
    <section className="container py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
          מה אומרים עלינו
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-ink">
          לקוחות שחזרו אלינו — ומספרים למה
        </h2>
        <p className="mt-2 text-slate-600">
          סיפורים אמיתיים ממשפחות שכבר חוו את ההזמנה, האריזה והשירות שלנו.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.author}
            className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)]"
          >
            <Quote
              aria-hidden
              className="absolute end-5 top-5 h-8 w-8 text-accent/20"
            />
            <Stars />
            <blockquote className="mt-3 text-sm leading-relaxed text-slate-700">
              ״{t.quote}״
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
              <span className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-100">
                <Image
                  src={t.avatar}
                  alt={t.pet}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-ink">{t.author}</div>
                <div className="text-xs text-slate-500">
                  {t.city} · {t.pet}
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
