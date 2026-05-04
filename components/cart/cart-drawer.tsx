'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, PackageOpen } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart, lineKey } from '@/store/cart-store';
import { formatILS } from '@/lib/utils';

export default function CartDrawer() {
  const { isOpen, close, items, setQuantity, remove, subtotal } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? null : close())}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>העגלה שלך ({items.reduce((n, i) => n + i.quantity, 0)})</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-slate-500">
              <p>העגלה ריקה.</p>
              <Button onClick={close} asChild>
                <Link href="/products">עיינו במוצרים</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={lineKey(item.productId, item.bundleId)} className="flex gap-3">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-slate-50">
                    <Image src={item.image} alt={item.title} fill sizes="80px" className="object-contain p-1" />
                  </div>
                  <div className="flex flex-1 flex-col min-w-0">
                    <Link
                      href={`/products/${item.productId}`}
                      onClick={close}
                      className="line-clamp-2 text-sm font-medium hover:text-brand"
                    >
                      {item.title}
                    </Link>
                    {item.bundleTitle && (
                      <span className="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-cream px-2 py-0.5 text-[10px] font-semibold text-brand ring-1 ring-brand/20">
                        <PackageOpen className="h-3 w-3" />
                        חלק מ{item.bundleTitle}
                      </span>
                    )}
                    <div className="mt-1 text-sm text-slate-600">
                      <span className="num whitespace-nowrap">{formatILS(item.price)}</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-md border border-slate-200">
                        <button
                          className="p-1.5 hover:bg-slate-100"
                          aria-label="הפחת"
                          onClick={() => setQuantity(item.productId, item.quantity - 1, item.bundleId)}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[2ch] px-2 text-center text-sm">{item.quantity}</span>
                        <button
                          className="p-1.5 hover:bg-slate-100"
                          aria-label="הוסף"
                          onClick={() => setQuantity(item.productId, item.quantity + 1, item.bundleId)}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        className="text-slate-400 hover:text-red-600"
                        aria-label="הסר"
                        onClick={() => remove(item.productId, item.bundleId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-slate-200 p-5">
            <div className="flex items-center justify-between text-sm">
              <span>סכום ביניים</span>
              <span className="num whitespace-nowrap font-semibold">{formatILS(subtotal())}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">משלוח ומיסים מחושבים בעמוד התשלום.</p>
            <Button asChild size="lg" variant="accent" className="mt-4 w-full">
              <Link href="/checkout" onClick={close}>לתשלום</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
