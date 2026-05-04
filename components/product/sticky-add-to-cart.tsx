'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/cart-store';
import { discountPct, formatILS } from '@/lib/utils';
import type { Product } from '@/lib/types';

const DEFAULT_ANCHOR_ID = 'product-add-to-cart';

export default function StickyAddToCart({
  product,
  anchorId = DEFAULT_ANCHOR_ID
}: {
  product: Product;
  /** id of the in-page Add-to-Cart element. Bar appears once it scrolls out of view. */
  anchorId?: string;
}) {
  const add = useCart((s) => s.add);
  const [visible, setVisible] = useState(false);
  const soldOut = product.stockStatus === 'out-of-stock';
  const onSale = discountPct(product.price, product.originalPrice) > 0;
  const thumb = product.images[0];

  useEffect(() => {
    const anchor = document.getElementById(anchorId);
    if (!anchor || typeof IntersectionObserver === 'undefined') {
      setVisible(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show once user has scrolled past the anchor (i.e. it's above the viewport).
        const scrolledPast =
          !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        setVisible(scrolledPast);
      },
      { threshold: 0, rootMargin: '0px 0px -40% 0px' }
    );
    observer.observe(anchor);
    return () => observer.disconnect();
  }, [anchorId]);

  function handleAdd() {
    add(product, 1);
    toast.success('המוצר נוסף לעגלה בהצלחה!', { description: product.title });
  }

  return (
    <div
      className={`sticky-cart-bar fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.18)] md:hidden ${visible ? 'sticky-cart-bar--in' : 'sticky-cart-bar--out pointer-events-none'}`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      role="region"
      aria-label="הוספה לעגלה מהירה"
      aria-hidden={!visible}
    >
      <div className="container flex items-center gap-3 py-3">
        {thumb && (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-100">
            <Image
              src={thumb}
              alt=""
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
        )}
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
          tabIndex={visible ? 0 : -1}
        >
          <ShoppingBag className="h-4 w-4" />
          {soldOut ? 'אזל' : 'הוסיפו לעגלה'}
        </Button>
      </div>
    </div>
  );
}
