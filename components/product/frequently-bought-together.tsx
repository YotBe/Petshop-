'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { formatILS } from '@/lib/utils';
import { useCart } from '@/store/cart-store';
import type { Product } from '@/lib/types';

export default function FrequentlyBoughtTogether({
  base,
  related
}: {
  base: Product;
  related: Product[];
}) {
  const items = [base, ...related];
  const [picked, setPicked] = useState<Record<string, boolean>>(
    Object.fromEntries(items.map((p) => [p.id, true]))
  );
  const add = useCart((s) => s.add);

  const total = items
    .filter((p) => picked[p.id])
    .reduce((sum, p) => sum + p.price, 0);

  if (related.length === 0) return null;

  function handleAddBundle() {
    const selected = items.filter((p) => picked[p.id]);
    if (selected.length === 0) return;
    selected.forEach((p) => add(p, 1));
    toast.success(`${selected.length} מוצרים נוספו לעגלה!`, {
      description: `סך החבילה: ${formatILS(total)}`
    });
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="text-lg font-semibold">נקנה לעיתים קרובות יחד</h3>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {items.map((p, i) => (
          <div key={p.id} className="flex items-center gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative h-20 w-20 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
                <Image
                  src={p.images[0]}
                  alt={p.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium line-clamp-2 max-w-[160px]">
                  {p.title}
                </div>
                <div className="text-sm text-slate-600">{formatILS(p.price)}</div>
                <input
                  type="checkbox"
                  checked={!!picked[p.id]}
                  onChange={(e) =>
                    setPicked((s) => ({ ...s, [p.id]: e.target.checked }))
                  }
                  className="mt-1 accent-brand"
                />
              </div>
            </label>
            {i < items.length - 1 && <Plus className="h-4 w-4 text-slate-400" />}
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-slate-600">
          סך החבילה:{' '}
          <span className="font-bold text-slate-900">{formatILS(total)}</span>
        </div>
        <Button onClick={handleAddBundle} variant="accent">
          הוסף חבילה לעגלה
        </Button>
      </div>
    </section>
  );
}
