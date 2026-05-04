import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/products';
import ProductGrid from '@/components/product/product-grid';

export default function FeaturedProducts() {
  const top4 = [...PRODUCTS]
    .sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount)
    .slice(0, 4);

  return (
    <section className="container pb-16">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Top-rated gear</h2>
          <p className="mt-2 text-slate-600">Most loved by trail-tough dogs.</p>
        </div>
        <Link href="/products" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <ProductGrid products={top4} />
    </section>
  );
}
