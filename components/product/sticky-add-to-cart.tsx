'use client';

import { ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/cart-store';
import { discountPct, formatILS } from '@/lib/utils';
import type { Product } from '@/lib/types';

export default function StickyAddToCart({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const soldOut = product.stockStatus === 'out-of-stock';
  const onSale = discountPct(product.price, product.originalPrice) > 0;

  function handleAdd() {
    add(product, 1);
    toast.success('המוצר נוסף לעגלה בהצלחה!', { description: product.title });
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.18)] md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      role="region"
      aria-label="הוספה לעגלה מהירה"
    >
      <div className="container flex items-center gap-3 py-3">
        <div className="min-w-0 flex-1">
          <div className="line-clamp-1 text-xs text-slate-500">
            {product.title}
          </div>
          <div className="mt-0.5 flex items-baseline gap-2">
            <span
              className={`num whitespace-nowrap text-base font-extrabold ${onSale ? 'text-accent' : 'text-ink'}`}
            >
              {formatILS(product.price)}
            </span>
            {product.originalPrice && (
              <span className="num whitespace-nowrap text-xs text-slate-400 line-through">
                {formatILS(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
        <Button
          variant="accent"
          size="lg"
          onClick={handleAdd}
          disabled={soldOut}
          className="shrink-0"
        >
          <ShoppingBag className="h-4 w-4" />
          {soldOut ? 'אזל' : 'הוסיפו לעגלה'}
        </Button>
      </div>
    </div>
  );
}
