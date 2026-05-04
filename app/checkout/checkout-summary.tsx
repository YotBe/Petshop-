'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, PackageOpen, Store } from 'lucide-react';
import { useCart, lineKey } from '@/store/cart-store';
import { useCheckoutPrefs } from '@/store/checkout-prefs';
import { formatILS } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function CheckoutSummary() {
  const { items, subtotal } = useCart();
  const deliveryMethod = useCheckoutPrefs((s) => s.deliveryMethod);
  const [open, setOpen] = useState(false);
  const sub = subtotal();
  const isPickup = deliveryMethod === 'pickup';
  const shipping = isPickup || sub > 19900 || sub === 0 ? 0 : 2499;
  const total = sub + shipping;
  const itemCount = items.reduce((n, i) => n + i.quantity, 0);

  if (items.length === 0) {
    return (
      <aside className="rounded-xl border border-slate-200 bg-white p-6">
        <p className="text-slate-600">העגלה שלך ריקה.</p>
        <Button asChild className="mt-4 w-full">
          <Link href="/products">המשך לקנות</Link>
        </Button>
      </aside>
    );
  }

  return (
    <aside className="rounded-xl border border-slate-200 bg-white h-fit lg:sticky lg:top-20">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 p-4 text-start touch-manipulation lg:hidden"
        aria-expanded={open}
        aria-controls="checkout-summary-body"
      >
        <span className="text-sm font-semibold text-ink">
          סיכום הזמנה (<span className="num">{itemCount}</span>)
        </span>
        <span className="flex items-center gap-2">
          <span className="num whitespace-nowrap text-base font-extrabold text-ink">
            {formatILS(total)}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-slate-500 transition ${open ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </span>
      </button>

      <div
        id="checkout-summary-body"
        className={`${open ? 'block' : 'hidden'} border-t border-slate-200 p-5 lg:!block lg:border-t-0 lg:p-6`}
      >
        <h2 className="hidden lg:block text-lg font-semibold">סיכום הזמנה</h2>
        <ul className="mt-0 space-y-3 lg:mt-4">
          {items.map((i) => (
            <li key={lineKey(i.productId, i.bundleId)} className="flex gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-slate-50">
                <Image src={i.image} alt={i.title} fill sizes="56px" className="object-contain p-1" />
                <span className="absolute -end-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-bold text-white">
                  {i.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="line-clamp-2 text-sm font-medium">{i.title}</p>
                {i.bundleTitle && (
                  <span className="mt-0.5 inline-flex w-fit items-center gap-1 rounded-full bg-cream px-1.5 py-0.5 text-[10px] font-semibold text-brand ring-1 ring-brand/20">
                    <PackageOpen className="h-2.5 w-2.5" />
                    {i.bundleTitle}
                  </span>
                )}
                <p className="text-xs text-slate-500">
                  <span className="num whitespace-nowrap">{formatILS(i.price)}</span>
                </p>
              </div>
              <div className="num whitespace-nowrap text-sm font-medium">
                {formatILS(i.price * i.quantity)}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-sm">
          <div className="flex justify-between">
            <span>סכום ביניים</span>
            <span className="num whitespace-nowrap">{formatILS(sub)}</span>
          </div>
          <div className="flex justify-between">
            <span className="inline-flex items-center gap-1.5">
              {isPickup && <Store className="h-3.5 w-3.5 text-brand" aria-hidden />}
              {isPickup ? 'איסוף עצמי' : 'משלוח'}
            </span>
            <span className="num whitespace-nowrap">
              {shipping === 0 ? 'חינם' : formatILS(shipping)}
            </span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold">
            <span>סה״כ</span>
            <span className="num whitespace-nowrap">{formatILS(total)}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
