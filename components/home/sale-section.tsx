import { Flame } from 'lucide-react';
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
    <section className="bg-rose-50 py-16">
      <div className="container">
        <div className="flex items-center gap-2">
          <Flame className="h-7 w-7 text-rose-600" />
          <h2 className="text-2xl md:text-3xl font-bold">מבצעים חמים</h2>
        </div>
        <p className="mt-2 text-slate-600">
          חיסכון של עד {topPct}% על המוצרים ההכי מבוקשים — לזמן מוגבל.
        </p>
        <div className="mt-8">
          <ProductGrid products={onSale} />
        </div>
      </div>
    </section>
  );
}
