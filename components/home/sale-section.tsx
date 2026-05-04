import Link from 'next/link';
import { ArrowLeft, Flame } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import ProductGrid from '@/components/product/product-grid';
import { discountPct } from '@/lib/utils';

export default function SaleSection() {
  const onSale = PRODUCTS
    .filter((p) => p.originalPrice && p.originalPrice > p.price)
    .sort((a, b) => discountPct(b.price, b.originalPrice) - discountPct(a.price, a.originalPrice))
    .slice(0, 4);

  if (onSale.length === 0) return null;
  const topPct = discountPct(onSale[0].price, onSale[0].originalPrice);

  return (
    <section id="deals" className="bg-accent-soft py-16 md:py-24">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent-dark">
              <Flame className="h-3.5 w-3.5" /> נגמר במלאי מהר
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-ink">
              מבצעים חמים השבוע
            </h2>
            <p className="mt-2 text-slate-700">
              חיסכון של עד <span className="num font-semibold">{topPct}%</span> על
              המוצרים ההכי מבוקשים — לזמן מוגבל.
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
          <ProductGrid products={onSale} />
        </div>
      </div>
    </section>
  );
}
