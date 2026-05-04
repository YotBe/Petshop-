'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import HeroVideo from '@/components/ui/hero-video';

export type GalleryMediaItem =
  | { kind: 'image'; src: string }
  | { kind: 'video'; src: string; poster: string };

function toMedia(input: string | GalleryMediaItem): GalleryMediaItem {
  if (typeof input === 'string') return { kind: 'image', src: input };
  return input;
}

export default function ProductGallery({
  images,
  media,
  alt
}: {
  /** Legacy: image-only list. */
  images?: string[];
  /** Mixed media list. Takes precedence over `images` if provided. */
  media?: Array<string | GalleryMediaItem>;
  alt: string;
}) {
  const items: GalleryMediaItem[] = (media ?? images ?? []).map(toMedia);
  const [active, setActive] = useState(0);
  const current = items[active];

  if (!current) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
        {current.kind === 'image' ? (
          <Image
            src={current.src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover zoom-on-hover"
          />
        ) : (
          <HeroVideo
            src={current.src}
            poster={current.poster}
            alt={alt}
            isActive
            mediaClassName="object-cover"
          />
        )}
      </div>
      {items.length > 1 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {items.map((item, i) => {
            const thumbSrc = item.kind === 'image' ? item.src : item.poster;
            return (
              <button
                key={`${item.kind}-${item.src}`}
                onClick={() => setActive(i)}
                className={cn(
                  'relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2',
                  active === i ? 'border-brand' : 'border-transparent'
                )}
                aria-label={
                  item.kind === 'video' ? `נגן וידאו ${i + 1}` : `הצג תמונה ${i + 1}`
                }
              >
                <Image
                  src={thumbSrc}
                  alt={`${alt} ${item.kind === 'video' ? 'וידאו' : 'תמונה'} ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
                {item.kind === 'video' && (
                  <span className="absolute inset-0 grid place-items-center bg-slate-900/30">
                    <Play className="h-5 w-5 fill-white text-white" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
