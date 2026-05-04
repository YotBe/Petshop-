import { PRODUCTS, CATEGORIES } from '@/lib/products';
import ProductGrid from '@/components/product/product-grid';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ProductsPage({
  searchParams
}: {
  searchParams: { category?: string; q?: string };
}) {
  const category = searchParams.category;
  const q = (searchParams.q ?? '').toLowerCase().trim();

  let products = PRODUCTS;
  if (category) products = products.filter((p) => p.category === category);
  if (q)
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold">
        {category
          ? CATEGORIES.find((c) => c.slug === category)?.title ?? 'קנייה'
          : 'כל המוצרים'}
      </h1>
      <p className="mt-1 text-slate-600">
        {products.length} {products.length === 1 ? 'מוצר' : 'מוצרים'}
        {q && <> תואמים ל-“{q}”</>}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/products"
          className={cn(
            'rounded-full border px-4 py-1.5 text-sm',
            !category ? 'border-brand bg-brand text-white' : 'border-slate-300 hover:bg-slate-100'
          )}
        >
          הכל
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/products?category=${c.slug}`}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm',
              category === c.slug
                ? 'border-brand bg-brand text-white'
                : 'border-slate-300 hover:bg-slate-100'
            )}
          >
            {c.title}
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
