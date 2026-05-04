'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/cart-store';
import { getProduct } from '@/lib/products';

export default function AddToCartButton({ productId }: { productId: string }) {
  const product = getProduct(productId);
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);

  if (!product) return null;
  const soldOut = product.stockStatus === 'out-of-stock';

  function handleAdd() {
    if (!product) return;
    add(product, qty);
    toast.success('המוצר נוסף לעגלה בהצלחה!', {
      description: `${qty} × ${product.title}`
    });
  }

  return (
    <div
      id="product-add-to-cart"
      data-sticky-cart-anchor
      className="mt-6 flex flex-wrap items-center gap-3"
    >
      <div className="inline-flex items-center rounded-md border border-slate-300">
        <button
          className="p-2 hover:bg-slate-100"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="הפחת"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="min-w-[2.5ch] px-3 text-center text-sm font-medium">{qty}</span>
        <button
          className="p-2 hover:bg-slate-100"
          onClick={() => setQty((q) => q + 1)}
          aria-label="הוסף"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <Button
        size="lg"
        variant="accent"
        className="flex-1 min-w-[180px]"
        disabled={soldOut}
        onClick={handleAdd}
      >
        {soldOut ? 'אזל מהמלאי' : 'הוסיפו לעגלה'}
      </Button>
    </div>
  );
}
