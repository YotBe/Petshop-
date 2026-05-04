'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/cart-store';
import { formatUSD } from '@/lib/utils';

export default function CartDrawer() {
  const { isOpen, close, items, setQuantity, remove, subtotal } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(o) => (o ? null : close())}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart ({items.reduce((n, i) => n + i.quantity, 0)})</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-slate-500">
              <p>Your cart is empty.</p>
              <Button onClick={close} asChild>
                <Link href="/products">Browse gear</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-3">
                  <div className="relative h-20 w-20 overflow-hidden rounded-md bg-slate-100">
                    <Image src={item.image} alt={item.title} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <Link
                      href={`/products/${item.productId}`}
                      onClick={close}
                      className="line-clamp-2 text-sm font-medium hover:text-brand"
                    >
                      {item.title}
                    </Link>
                    <div className="mt-1 text-sm text-slate-600">{formatUSD(item.price)}</div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center rounded-md border border-slate-200">
                        <button
                          className="p-1.5 hover:bg-slate-100"
                          aria-label="decrease"
                          onClick={() => setQuantity(item.productId, item.quantity - 1)}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[2ch] px-2 text-center text-sm">{item.quantity}</span>
                        <button
                          className="p-1.5 hover:bg-slate-100"
                          aria-label="increase"
                          onClick={() => setQuantity(item.productId, item.quantity + 1)}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        className="text-slate-400 hover:text-red-600"
                        aria-label="remove"
                        onClick={() => remove(item.productId)}
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
              <span>Subtotal</span>
              <span className="font-semibold">{formatUSD(subtotal())}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">Shipping and taxes calculated at checkout.</p>
            <Button asChild size="lg" className="mt-4 w-full">
              <Link href="/checkout" onClick={close}>Checkout</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
