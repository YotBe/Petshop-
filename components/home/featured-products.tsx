import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import ProductGrid from '@/components/product/product-grid';

export default function FeaturedProducts() {
  const top4 = [...PRODUCTS]
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, 4);

  return (
    <section id="top-rated" className="container py-16 md:py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            המוצרים שחוזרים אליהם הכי הרבה
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-ink">
            הציוד הכי מדורג
          </h2>
          <p className="mt-2 text-slate-600">
            מדורגים על ידי אלפי לקוחות — ועדיין מסתדרים בכל יום בשטח.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-dark"
        >
          ראו הכל <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-8">
        <ProductGrid products={top4} />
      </div>
    </section>
  );
}
