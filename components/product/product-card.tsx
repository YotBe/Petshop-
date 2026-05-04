'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { discountPct, formatILS } from '@/lib/utils';
import { useCart } from '@/store/cart-store';
import type { Product } from '@/lib/types';

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const pct = discountPct(product.price, product.originalPrice);

  function handleAdd() {
    add(product, 1);
    toast.success('המוצר נוסף לעגלה בהצלחה!', {
      description: product.title
    });
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-md">
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-slate-100"
      >
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover zoom-on-hover"
        />
        <div className="absolute start-3 top-3 flex flex-col gap-1">
          {pct > 0 && <Badge variant="sale">חסכו {pct}%</Badge>}
          {product.stockStatus === 'low-stock' && (
            <Badge variant="warning">מלאי נמוך</Badge>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4 min-w-0">
        <Link
          href={`/products/${product.id}`}
          className="line-clamp-2 font-semibold hover:text-brand"
        >
          {product.title}
        </Link>
        <div className="mt-1 flex items-center gap-1 text-xs text-slate-600">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-medium">{product.rating.toFixed(1)}</span>
          <span className="text-slate-400">
            ({product.reviewCount.toLocaleString('he-IL')})
          </span>
        </div>
        <div className="mt-2 flex flex-wrap items-baseline gap-2">
          <span className="font-bold">{formatILS(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through">
              {formatILS(product.originalPrice)}
            </span>
          )}
        </div>
        <Button
          className="mt-3 w-full"
          onClick={handleAdd}
          disabled={product.stockStatus === 'out-of-stock'}
        >
          {product.stockStatus === 'out-of-stock' ? 'אזל מהמלאי' : 'הוסף לעגלה'}
        </Button>
      </div>
    </div>
  );
}
