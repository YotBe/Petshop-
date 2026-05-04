'use client';

import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/store/cart-store';
import { useEffect, useState } from 'react';

export default function CartButton() {
  const open = useCart((s) => s.open);
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      onClick={open}
      className="relative inline-flex h-12 w-12 items-center justify-center rounded-md text-ink hover:bg-slate-100 active:bg-slate-200 touch-manipulation"
      aria-label="פתח עגלה"
    >
      <ShoppingBag className="h-5 w-5" />
      {mounted && count > 0 && (
        <span className="absolute -end-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand-accent px-1 text-[10px] font-bold text-slate-900">
          {count}
        </span>
      )}
    </button>
  );
}
