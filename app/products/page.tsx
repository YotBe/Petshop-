import { PRODUCTS, CATEGORIES } from '@/lib/products';
import ProductGrid from '@/components/product/product-grid';
import Link from 'next/link';
import { cn, discountPct } from '@/lib/utils';
import type { Product } from '@/lib/types';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'featured', label: 'מומלצים' },
  { key: 'price-asc', label: 'מחיר נמוך לגבוה' },
  { key: 'price-desc', label: 'מחיר גבוה לנמוך' },
  { key: 'rating', label: 'דירוג גבוה' },
  { key: 'discount', label: 'הנחה גדולה' }
];

function sortProducts(list: Product[], sort: SortKey | undefined) {
  const arr = [...list];
  switch (sort) {
    case 'price-asc':
      arr.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      arr.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      arr.sort((a, b) => b.rating - a.rating);
      break;
    case 'discount':
      arr.sort(
        (a, b) =>
          discountPct(b.price, b.originalPrice) - discountPct(a.price, a.originalPrice)
      );
      break;
    case 'featured':
    default:
      arr.sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
  }
  return arr;
}

export default function ProductsPage({
  searchParams
}: {
  searchParams: { category?: string; q?: string; sort?: SortKey };
}) {
  const category = searchParams.category;
  const q = (searchParams.q ?? '').toLowerCase().trim();
  const sort = searchParams.sort ?? 'featured';

  let products = PRODUCTS;
  if (category) products = products.filter((p) => p.category === category);
  if (q)
    products = products.filter(
      (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  products = sortProducts(products, sort);

  const buildHref = (overrides: Partial<{ category: string; q: string; sort: SortKey }>) => {
    const merged: Record<string, string | undefined> = { ...searchParams, ...overrides };
    const sp = new URLSearchParams();
    Object.entries(merged).forEach(([k, v]) => {
      if (v) sp.set(k, v as string);
    });
    const qs = sp.toString();
    return `/products${qs ? `?${qs}` : ''}`;
  };

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
          href={buildHref({ category: undefined })}
          className={cn(
            'rounded-full border px-4 py-1.5 text-sm',
            !category
              ? 'border-brand bg-brand text-white'
              : 'border-slate-300 hover:bg-slate-100'
          )}
        >
          הכל
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={buildHref({ category: c.slug })}
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

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-slate-500">מיון:</span>
        {SORT_OPTIONS.map((opt) => (
          <Link
            key={opt.key}
            href={buildHref({ sort: opt.key })}
            className={cn(
              'rounded-md border px-3 py-1',
              sort === opt.key
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-200 text-slate-600 hover:bg-slate-100'
            )}
          >
            {opt.label}
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
