'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Star, BadgeCheck, Flag, Check, X } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import type { Review } from '@/lib/types';

type Decision = 'approve' | 'reject';

export default function ReviewModerationList({
  items
}: {
  items: { review: Review; productTitle: string }[];
}) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState<Set<string>>(new Set());
  const [, startTransition] = useTransition();

  function toggle(id: string) {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleAll() {
    if (selected.size === items.length) setSelected(new Set());
    else setSelected(new Set(items.map((it) => it.review.id)));
  }

  async function moderate(id: string, decision: Decision) {
    setBusy((b) => new Set(b).add(id));
    try {
      const res = await fetch(`/api/reviews/${id}/moderate`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ decision })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `שגיאה ${res.status}`);
      }
    } finally {
      setBusy((b) => {
        const next = new Set(b);
        next.delete(id);
        return next;
      });
    }
  }

  async function bulkModerate(decision: Decision) {
    if (selected.size === 0) return;
    const ids = Array.from(selected);
    try {
      await Promise.all(ids.map((id) => moderate(id, decision)));
      toast.success(
        `${decision === 'approve' ? 'אושרו' : 'נדחו'} ${ids.length} ביקורות`
      );
      setSelected(new Set());
      startTransition(() => router.refresh());
    } catch (err) {
      toast.error('פעולה אחת נכשלה', {
        description: (err as Error).message
      });
    }
  }

  async function singleModerate(id: string, decision: Decision) {
    try {
      await moderate(id, decision);
      toast.success(decision === 'approve' ? 'הביקורת אושרה' : 'הביקורת נדחתה');
      startTransition(() => router.refresh());
    } catch (err) {
      toast.error('פעולה נכשלה', { description: (err as Error).message });
    }
  }

  return (
    <div>
      <div className="sticky top-16 z-10 -mx-4 mb-4 flex flex-wrap items-center justify-between gap-3 border-y border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:-mx-0 md:rounded-xl md:border md:px-4">
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={selected.size > 0 && selected.size === items.length}
            onChange={toggleAll}
            className="h-4 w-4 accent-brand"
          />
          {selected.size > 0 ? (
            <span>
              נבחרו <span className="num font-semibold">{selected.size}</span>
            </span>
          ) : (
            <span className="text-slate-600">בחרו הכל</span>
          )}
        </label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            disabled={selected.size === 0}
            onClick={() => bulkModerate('reject')}
          >
            <X className="h-4 w-4" />
            דחו
          </Button>
          <Button
            type="button"
            size="sm"
            variant="accent"
            disabled={selected.size === 0}
            onClick={() => bulkModerate('approve')}
          >
            <Check className="h-4 w-4" />
            אשרו
          </Button>
        </div>
      </div>

      <ul className="space-y-3">
        {items.map(({ review, productTitle }) => {
          const isBusy = busy.has(review.id);
          const isSelected = selected.has(review.id);
          return (
            <li
              key={review.id}
              className={`rounded-2xl border bg-white p-4 transition ${
                isSelected ? 'border-brand ring-2 ring-brand/20' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggle(review.id)}
                  className="mt-1 h-4 w-4 accent-brand"
                  aria-label="בחר ביקורת"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                    <span className="font-semibold text-ink">{review.authorName}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500">{review.authorEmail}</span>
                    {review.isVerifiedPurchase && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
                        <BadgeCheck className="h-3 w-3" />
                        קנייה מאומתת
                      </span>
                    )}
                    {review.isFlagged && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800 ring-1 ring-amber-200">
                        <Flag className="h-3 w-3" />
                        סומנה: {review.flagReason}
                      </span>
                    )}
                  </div>

                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={
                            idx < review.rating
                              ? 'h-3.5 w-3.5 fill-amber-400 text-amber-400'
                              : 'h-3.5 w-3.5 text-slate-300'
                          }
                        />
                      ))}
                    </div>
                    <time className="text-xs text-slate-400">
                      {new Date(review.createdAt).toLocaleString('he-IL')}
                    </time>
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    מוצר:{' '}
                    <span className="font-medium text-slate-700">
                      {productTitle}
                    </span>
                  </div>

                  <h3 className="mt-2 font-bold text-ink">{review.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">
                    {review.content}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={isBusy}
                  onClick={() => singleModerate(review.id, 'reject')}
                >
                  <X className="h-4 w-4" />
                  דחו
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="accent"
                  disabled={isBusy}
                  onClick={() => singleModerate(review.id, 'approve')}
                >
                  <Check className="h-4 w-4" />
                  אשרו
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
