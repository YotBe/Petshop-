'use client';

import { useEffect, useState } from 'react';
import { Star, BadgeCheck, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import ReviewForm from './review-form';
import type { Review, ReviewSort } from '@/lib/types';

const SORT_OPTIONS: { key: ReviewSort; label: string }[] = [
  { key: 'helpful', label: 'הכי מועילות' },
  { key: 'newest', label: 'החדשות ביותר' },
  { key: 'highest', label: 'דירוג הכי גבוה' }
];

const PAGE_SIZE = 5;

type Stats = {
  count: number;
  average: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
};

type Listing = {
  reviews: Review[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  stats: Stats | null;
};

export default function Reviews({
  productId,
  rating: fallbackRating,
  count: fallbackCount
}: {
  productId: string;
  rating: number;
  count: number;
}) {
  const [data, setData] = useState<Listing | null>(null);
  const [sort, setSort] = useState<ReviewSort>('helpful');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const sp = new URLSearchParams({
          productId,
          sort,
          page: String(page),
          pageSize: String(PAGE_SIZE)
        });
        const res = await fetch(`/api/reviews?${sp.toString()}`);
        const json = (await res.json()) as Listing;
        if (!cancelled) setData(json);
      } catch {
        // ignore — fall back to fallback rating display
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [productId, sort, page, refreshKey]);

  const stats = data?.stats;
  const avg = stats && stats.count > 0 ? stats.average : fallbackRating;
  const total = stats?.count ?? fallbackCount;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-ink">ביקורות לקוחות</h3>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-baseline gap-1.5">
              <span className="num font-display text-3xl font-extrabold text-ink">
                {avg.toFixed(1)}
              </span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < Math.round(avg)
                        ? 'h-4 w-4 fill-amber-400 text-amber-400'
                        : 'h-4 w-4 text-slate-300'
                    }
                  />
                ))}
              </div>
            </div>
            <span className="text-sm text-slate-500">
              מבוסס על <span className="num font-semibold text-ink">{total.toLocaleString('he-IL')}</span> ביקורות
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-ink hover:border-brand hover:text-brand active:bg-slate-50 touch-manipulation"
        >
          <MessageSquare className="h-4 w-4" />
          {showForm ? 'סגור טופס' : 'כתבו ביקורת'}
        </button>
      </header>

      {showForm && (
        <div className="mt-5 rounded-xl border border-slate-200 bg-cream p-4 md:p-5">
          <ReviewForm
            productId={productId}
            onSubmitted={() => {
              setShowForm(false);
              setRefreshKey((k) => k + 1);
            }}
          />
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-slate-500">מיון:</span>
        {SORT_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => {
              setSort(opt.key);
              setPage(1);
            }}
            aria-pressed={sort === opt.key}
            className={
              sort === opt.key
                ? 'rounded-full bg-brand text-white px-3 py-1.5 text-sm font-medium shadow-sm'
                : 'rounded-full border border-slate-300 text-slate-700 px-3 py-1.5 text-sm hover:border-brand hover:text-brand'
            }
          >
            {opt.label}
          </button>
        ))}
      </div>

      {data && data.reviews.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
          עדיין אין ביקורות. היו הראשונים לכתוב.
        </p>
      ) : (
        <ul className={`mt-6 space-y-4 ${loading ? 'opacity-70' : ''}`}>
          {(data?.reviews ?? []).map((r) => (
            <li
              key={r.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand text-sm font-semibold">
                  {r.authorName.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                    <span className="font-semibold text-ink">{r.authorName}</span>
                    {r.isVerifiedPurchase && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                        <BadgeCheck className="h-3 w-3" />
                        קנייה מאומתת
                      </span>
                    )}
                    {(r.petName || r.petBreed) && (
                      <span className="text-xs text-slate-500">
                        · {r.petName ?? ''}{r.petName && r.petBreed ? ' · ' : ''}{r.petBreed ?? ''}{r.petWeight ? ` · ${r.petWeight}` : ''}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={
                            idx < r.rating
                              ? 'h-3.5 w-3.5 fill-amber-400 text-amber-400'
                              : 'h-3.5 w-3.5 text-slate-300'
                          }
                        />
                      ))}
                    </div>
                    <time className="text-xs text-slate-400">
                      {new Date(r.createdAt).toLocaleDateString('he-IL')}
                    </time>
                  </div>
                  <h4 className="mt-2 text-sm font-bold text-ink">{r.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">
                    {r.content}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {data && data.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={data.page <= 1}
            className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:border-brand hover:text-brand"
          >
            <ChevronRight className="h-4 w-4" />
            הקודם
          </button>
          <span className="text-sm text-slate-500">
            עמוד <span className="num font-semibold text-ink">{data.page}</span> מתוך <span className="num">{data.totalPages}</span>
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={data.page >= data.totalPages}
            className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:border-brand hover:text-brand"
          >
            הבא
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}
