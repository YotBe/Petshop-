'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover zoom-on-hover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={cn(
                'relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2',
                active === i ? 'border-brand' : 'border-transparent'
              )}
              aria-label={`הצג תמונה ${i + 1}`}
            >
              <Image src={src} alt={`${alt} תמונה ${i + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
