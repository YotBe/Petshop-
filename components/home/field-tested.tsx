import Image from 'next/image';
import { Star, ShieldCheck } from 'lucide-react';

type FieldReview = {
  image: string;
  alt: string;
  dog: string;
  breed: string;
  owner: string;
  product: string;
  quote: string;
};

const REVIEWS: FieldReview[] = [
  {
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&h=700&fit=crop',
    alt: 'כלב ספורטיבי רץ עם רתמה',
    dog: 'אסף',
    breed: 'הזרון גרמני קצר־שיער',
    owner: 'מיכל א.',
    product: 'רתמת בטיחות לרכב',
    quote:
      'אסף קורע כל רתמה תוך חודש. את זאת הוא לובש כבר 8 חודשים — אחרי כ-200 שעות שטח, גשם וחול — בלי שריטה ובלי תפר רופף. סוף סוף משהו שעומד בקצב שלו.'
  },
  {
    image: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?w=900&h=700&fit=crop',
    alt: 'בורדר קולי קופץ עם צעצוע',
    dog: 'בלכה',
    breed: 'בורדר קולי',
    owner: 'תומר ל.',
    product: 'סט צעצועי EVA',
    quote:
      'בלכה שוברת כדור טניס תוך 20 דקות. סט ה־EVA איתה כבר חודשיים — שני אימונים ביום, חוף, פארק וחצר — ועדיין נראה חדש. הקצף לא נמעך והפריזבי לא נסדק.'
  },
  {
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=900&h=700&fit=crop',
    alt: 'כלב הולך בשביל הרים עם הבעלים',
    dog: 'ציפי',
    breed: 'וייסלה',
    owner: 'נדב ש.',
    product: 'בקבוק שתייה נייד + רתמת חוץ',
    quote:
      'אנחנו עושים מסלול ארוך כל שבת. הבקבוק והרתמה עברו איתי גשם, חול, סלעים ועוד אלפיים ק״מ בכביש. ציוד ברמה של אנשי שטח — במחיר שפוי.'
  }
];

function StarRow() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 מתוך 5 כוכבים">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export default function FieldTested() {
  return (
    <section className="container py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
          <ShieldCheck className="h-3.5 w-3.5" /> נבדק בשטח
        </p>
        <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-ink">
          הציוד שלא נשבר — גם לא תחת הכלבים הכי קשוחים
        </h2>
        <p className="mt-2 text-slate-600">
          לקוחות עם כלבים אקטיביים במיוחד מספרים איך הציוד מחזיק מעמד בשטח,
          חודשים אחרי הקנייה.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {REVIEWS.map((r) => (
          <figure
            key={r.dog}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)]"
          >
            <div className="relative aspect-[4/3] bg-slate-100">
              <Image
                src={r.image}
                alt={r.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
              <div className="absolute end-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                {r.product}
              </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <StarRow />
              <blockquote className="mt-3 text-sm leading-relaxed text-slate-700">
                ״{r.quote}״
              </blockquote>
              <figcaption className="mt-5 border-t border-slate-100 pt-4">
                <div className="text-sm font-semibold text-ink">
                  {r.owner} · בעל/ת {r.dog}
                </div>
                <div className="text-xs text-slate-500">{r.breed}</div>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
