'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import ProductGrid from '@/components/product/product-grid';
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
  const [q] = useState(initialQ ?? '');
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

  function syncUrl(next: { category?: string; sort?: SortKey }) {
    const finalCat = next.category ?? category;
    const finalSort = next.sort ?? sort;
    const sp = new URLSearchParams();
    if (q) sp.set('q', q);
    if (finalCat) sp.set('category', finalCat);
    if (finalSort && finalSort !== 'featured') sp.set('sort', finalSort);
    const qs = sp.toString();
    router.replace(qs ? `/products?${qs}` : '/products', { scroll: false });
  }

  function selectCategory(slug: string) {
    setCategory(slug);
    syncUrl({ category: slug });
  }
  function selectSort(key: SortKey) {
    setSort(key);
    syncUrl({ sort: key });
  }

  const allCategories = [{ slug: '', title: 'הכל' }, ...categories];

  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink">
            {category
              ? categories.find((c) => c.slug === category)?.title ?? 'קנייה'
              : 'כל המוצרים'}
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            <span className="num">{filtered.length}</span>{' '}
            {filtered.length === 1 ? 'מוצר' : 'מוצרים'}
            {q && (
              <>
                {' '}
                תואמים ל-״{q}״
              </>
            )}
          </p>
        </div>

        <div className="hidden lg:block">
          <SortSelect value={sort} onChange={selectSort} />
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
        <aside className="hidden lg:block">
          <FilterSidebar
            categories={allCategories}
            activeCategory={category}
            onSelect={selectCategory}
          />
        </aside>

        <div className="min-w-0">
          <div className="lg:hidden -mx-4 px-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {allCategories.map((c) => {
                const active = category === c.slug;
                return (
                  <button
                    key={c.slug || 'all'}
                    type="button"
                    onClick={() => selectCategory(c.slug)}
                    aria-pressed={active}
                    className={cn(
                      'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition touch-manipulation',
                      active
                        ? 'border-brand bg-brand text-white shadow-sm'
                        : 'border-slate-300 bg-white text-ink hover:border-brand hover:text-brand'
                    )}
                  >
                    {c.title}
                  </button>
                );
              })}
            </div>
            <div className="mt-3">
              <SortSelect value={sort} onChange={selectSort} />
            </div>
          </div>

          <div className="mt-6 lg:mt-0">
            <ProductGrid products={filtered} />
          </div>
        </div>
      </div>
    </>
  );
}

function FilterSidebar({
  categories,
  activeCategory,
  onSelect
}: {
  categories: { slug: string; title: string }[];
  activeCategory: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)]">
      <div className="flex items-center gap-2 px-2 pb-3">
        <SlidersHorizontal className="h-4 w-4 text-brand" />
        <h2 className="text-sm font-bold text-ink">סינון</h2>
      </div>
      <div className="space-y-1 border-t border-slate-100 pt-3">
        <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          קטגוריה
        </p>
        <ul className="mt-1 space-y-0.5">
          {categories.map((c) => {
            const active = activeCategory === c.slug;
            return (
              <li key={c.slug || 'all'}>
                <button
                  type="button"
                  onClick={() => onSelect(c.slug)}
                  aria-pressed={active}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition',
                    active
                      ? 'bg-brand/10 font-semibold text-brand'
                      : 'text-slate-700 hover:bg-slate-50'
                  )}
                >
                  <span>{c.title}</span>
                  {active && (
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 rounded-full bg-brand"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-3 text-[11px] text-slate-500">
        סינון נוסף לפי משקל, מחיר ומותג — בקרוב.
      </div>
    </div>
  );
}

function SortSelect({
  value,
  onChange
}: {
  value: SortKey;
  onChange: (k: SortKey) => void;
}) {
  return (
    <label className="relative flex items-center gap-2 text-sm">
      <span className="text-slate-500">מיון:</span>
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="h-10 appearance-none rounded-md border border-slate-300 bg-white ps-3 pe-9 text-sm font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute end-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        />
      </span>
    </label>
  );
}
