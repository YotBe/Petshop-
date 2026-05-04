'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/store/cart-store';
import { formatILS } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function CheckoutSummary() {
  const { items, subtotal } = useCart();
  const sub = subtotal();
  const shipping = sub > 19900 || sub === 0 ? 0 : 2499;
  const total = sub + shipping;

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
    <aside className="rounded-xl border border-slate-200 bg-white p-6 h-fit lg:sticky lg:top-20">
      <h2 className="text-lg font-semibold">סיכום הזמנה</h2>
      <ul className="mt-4 space-y-3">
        {items.map((i) => (
          <li key={i.productId} className="flex gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-md bg-slate-100">
              <Image src={i.image} alt={i.title} fill sizes="56px" className="object-cover" />
              <span className="absolute -end-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-bold text-white">
                {i.quantity}
              </span>
            </div>
            <div className="flex-1">
              <p className="line-clamp-2 text-sm font-medium">{i.title}</p>
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
          <span>משלוח</span>
          <span className="num whitespace-nowrap">
            {shipping === 0 ? 'חינם' : formatILS(shipping)}
          </span>
        </div>
        <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold">
          <span>סה״כ</span>
          <span className="num whitespace-nowrap">{formatILS(total)}</span>
        </div>
      </div>
    </aside>
  );
}
