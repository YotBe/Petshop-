'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import ProductGrid from '@/components/product/product-grid';
import { Input } from '@/components/ui/input';
import { cn, discountPct } from '@/lib/utils';
import type { Product, CategoryMeta } from '@/lib/types';

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'featured', label: 'מומלצים' },
  { key: 'price-asc', label: 'מחיר נמוך לגבוה' },
  { key: 'price-desc', label: 'מחיר גבוה לנמוך' },
  { key: 'rating', label: 'דירוג גבוה' },
  { key: 'discount', label: 'הנחה גדולה' }
];

export default function ProductsExplorer({
  products,
  categories,
  initialCategory,
  initialQ,
  initialSort
}: {
  products: Product[];
  categories: CategoryMeta[];
  initialCategory?: string;
  initialQ?: string;
  initialSort?: SortKey;
}) {
  const router = useRouter();
  const [q, setQ] = useState(initialQ ?? '');
  const [category, setCategory] = useState(initialCategory ?? '');
  const [sort, setSort] = useState<SortKey>(initialSort ?? 'featured');

  const filtered = useMemo(() => {
    let list = products;
    if (category) list = list.filter((p) => p.category === category);
    const term = q.toLowerCase().trim();
    if (term)
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    list = [...list];
    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        list.sort(
          (a, b) =>
            discountPct(b.price, b.originalPrice) -
            discountPct(a.price, a.originalPrice)
        );
        break;
      case 'featured':
      default:
        list.sort((a, b) => b.rating * b.reviewCount - a.rating * a.reviewCount);
    }
    return list;
  }, [products, category, q, sort]);

  function syncUrl(next: { q?: string; category?: string; sort?: SortKey }) {
    const finalQ = next.q ?? q;
    const finalCat = next.category ?? category;
    const finalSort = next.sort ?? sort;
    const sp = new URLSearchParams();
    if (finalQ) sp.set('q', finalQ);
    if (finalCat) sp.set('category', finalCat);
    if (finalSort && finalSort !== 'featured') sp.set('sort', finalSort);
    const qs = sp.toString();
    router.replace(qs ? `/products?${qs}` : '/products', { scroll: false });
  }

  return (
    <>
      <h1 className="text-3xl font-bold">
        {category
          ? categories.find((c) => c.slug === category)?.title ?? 'קנייה'
          : 'כל המוצרים'}
      </h1>
      <p className="mt-1 text-slate-600">
        {filtered.length} {filtered.length === 1 ? 'מוצר' : 'מוצרים'}
        {q && (
          <>
            {' '}
            תואמים ל-“{q}”
          </>
        )}
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              syncUrl({ q: e.target.value });
            }}
            placeholder="חיפוש לפי שם מוצר..."
            className="ps-9"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setCategory('');
              syncUrl({ category: '' });
            }}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm transition',
              !category
                ? 'border-brand bg-brand text-white'
                : 'border-slate-300 hover:bg-slate-100'
            )}
          >
            הכל
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => {
                setCategory(c.slug);
                syncUrl({ category: c.slug });
              }}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm transition',
                category === c.slug
                  ? 'border-brand bg-brand text-white'
                  : 'border-slate-300 hover:bg-slate-100'
              )}
            >
              {c.title}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-slate-500">מיון:</span>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              type="button"
              onClick={() => {
                setSort(opt.key);
                syncUrl({ sort: opt.key });
              }}
              className={cn(
                'rounded-md border px-3 py-1 transition',
                sort === opt.key
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-100'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <ProductGrid products={filtered} />
      </div>
    </>
  );
}
