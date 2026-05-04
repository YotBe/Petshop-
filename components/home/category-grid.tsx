import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { CATEGORIES } from '@/lib/products';

const CATEGORY_VISUALS: Record<string, { image: string; tagline: string }> = {
  'harnesses-leashes': {
    image: '/products/IMG_3790.jpeg',
    tagline: 'אחיזה בטוחה לכל טיול'
  },
  'outdoor-gear': {
    image: '/products/IMG_3789.jpeg',
    tagline: 'לטיולי שטח, חוף וקמפינג'
  },
  'interactive-toys': {
    image: '/products/IMG_3786.jpeg',
    tagline: 'משחק חכם שמרגיע ומשעשע'
  },
  training: {
    image: '/products/IMG_3785.jpeg',
    tagline: 'כלים שעוזרים לכם להבין זה את זה'
  },
  'beds-furniture': {
    image: '/products/IMG_3775.jpeg',
    tagline: 'פינה רכה לנוח אחרי יום ארוך'
  },
  feeding: {
    image: '/products/IMG_3788.jpeg',
    tagline: 'קערות, מיכלים ופתרונות חכמים'
  }
};

export default function CategoryGrid() {
  return (
    <section id="categories" className="container py-16 md:py-24">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            קטלוג החנות
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-ink">
            קנו לפי קטגוריה
          </h2>
          <p className="mt-2 text-slate-600">
            כל מה שהחבר שלכם צריך — מסודר לפי שימוש.
          </p>
        </div>
        <Link
          href="/products"
          className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-dark"
        >
          ראו הכל <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {CATEGORIES.map((c) => {
          const visual = CATEGORY_VISUALS[c.slug];
          return (
            <Link
              key={c.slug}
              href={`/products?category=${c.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.12)] transition hover:shadow-[0_8px_28px_-8px_rgba(15,23,42,0.22)]"
            >
              {visual?.image && (
                <Image
                  src={visual.image}
                  alt={c.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              )}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
              />
              <div className="absolute inset-x-4 bottom-4 text-white">
                <h3 className="text-lg font-bold leading-tight md:text-xl">
                  {c.title}
                </h3>
                <p className="mt-1 text-sm text-white/85 line-clamp-1">
                  {visual?.tagline ?? c.description}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent opacity-0 transition group-hover:opacity-100">
                  עברו לקטגוריה <ArrowLeft className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 text-center md:hidden">
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-dark"
        >
          ראו את כל המוצרים <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
