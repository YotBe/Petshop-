'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DiscountStamp } from '@/components/ui/discount-stamp';
import { discountPct, formatILS } from '@/lib/utils';
import { useCart } from '@/store/cart-store';
import { track } from '@/lib/analytics';
import type { Product } from '@/lib/types';

function getSocialLabel(product: Product): { text: string; variant: 'bestseller' | 'brand' } | null {
  if (product.rating >= 4.9) return { text: 'אהוב במיוחד', variant: 'brand' };
  if (product.reviewCount >= 1500) return { text: 'בסט-סלר', variant: 'bestseller' };
  return null;
}

export default function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const pct = discountPct(product.price, product.originalPrice);
  const onSale = pct > 0;
  const label = !onSale ? getSocialLabel(product) : null;

  function handleAdd() {
    add(product, 1);
    track('add_to_cart', {
      productId: product.id,
      price: product.price,
      onSale
    });
    toast.success('המוצר נוסף לעגלה בהצלחה!', {
      description: product.title
    });
  }

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)] transition hover:shadow-[0_8px_28px_-8px_rgba(15,23,42,0.18)]">
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-slate-50"
      >
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-3 transition duration-500 group-hover:scale-[1.04]"
        />
        {onSale && (
          <DiscountStamp
            pct={pct}
            size="md"
            className="absolute -start-2 -top-2 rotate-[-8deg] z-10"
          />
        )}
        {product.stockStatus === 'low-stock' && (
          <div className={`absolute start-2.5 ${onSale ? 'top-16' : 'top-2.5'}`}>
            <Badge variant="warning">מלאי נמוך</Badge>
          </div>
        )}
        {label && (
          <div className="absolute end-2.5 top-2.5">
            <Badge variant={label.variant}>{label.text}</Badge>
          </div>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-4 min-w-0">
        <Link
          href={`/products/${product.id}`}
          className="line-clamp-2 min-h-[2.75rem] font-semibold text-ink hover:text-brand"
        >
          {product.title}
        </Link>
        <div className="mt-1.5 flex items-center gap-1 text-xs text-slate-600">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-ink">{product.rating.toFixed(1)}</span>
          <span className="text-slate-400">
            (<span className="num">{product.reviewCount.toLocaleString('he-IL')}</span> ביקורות)
          </span>
        </div>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span
            className={`num whitespace-nowrap text-lg font-extrabold ${onSale ? 'text-accent' : 'text-ink'}`}
          >
            {formatILS(product.price)}
          </span>
          {product.originalPrice && (
            <span className="num whitespace-nowrap text-sm text-slate-400 line-through">
              {formatILS(product.originalPrice)}
            </span>
          )}
        </div>
        <Button
          variant="accent"
          className="mt-3 w-full"
          onClick={handleAdd}
          disabled={product.stockStatus === 'out-of-stock'}
        >
          {product.stockStatus === 'out-of-stock' ? 'אזל מהמלאי' : 'הוסיפו לעגלה'}
        </Button>
      </div>
    </div>
  );
}
