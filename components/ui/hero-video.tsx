'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface HeroVideoSource {
  src: string;
  type?: string;
}

export interface HeroVideoProps {
  /** Single video URL (.webm/.mp4) or an array of sources for multiple formats. */
  src: string | HeroVideoSource[];
  /** Static image shown while the video loads or if it fails. */
  poster: string;
  /** Accessible description / alt text for the fallback image. */
  alt: string;
  /** Pause playback when the user prefers reduced motion (default: true). */
  respectReducedMotion?: boolean;
  /** Pause playback when the video is offscreen to save battery (default: true). */
  pauseWhenOffscreen?: boolean;
  /** Whether the video should be actively playing (used by gallery for active-slide control). */
  isActive?: boolean;
  className?: string;
  /** Tailwind classes applied to the inner <video>/<img>. */
  mediaClassName?: string;
  /** Use Next/Image for the poster fallback (with `fill`). Defaults to true. */
  useNextImage?: boolean;
  /** Forwarded to the underlying <video>. */
  preload?: 'none' | 'metadata' | 'auto';
}

const isReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function HeroVideo({
  src,
  poster,
  alt,
  respectReducedMotion = true,
  pauseWhenOffscreen = true,
  isActive = true,
  className,
  mediaClassName,
  useNextImage = true,
  preload = 'metadata'
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [failed, setFailed] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [inView, setInView] = useState(!pauseWhenOffscreen);

  const sources: HeroVideoSource[] =
    typeof src === 'string'
      ? [{ src, type: src.endsWith('.webm') ? 'video/webm' : 'video/mp4' }]
      : src;

  useEffect(() => {
    if (!pauseWhenOffscreen || !containerRef.current) return;
    const el = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pauseWhenOffscreen]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;
    const reduced = respectReducedMotion && isReducedMotion();
    const shouldPlay = isActive && inView && !reduced && canPlay;

    if (shouldPlay) {
      const promise = video.play();
      if (promise && typeof promise.catch === 'function') {
        promise.catch(() => setFailed(true));
      }
    } else {
      video.pause();
    }
  }, [isActive, inView, canPlay, failed, respectReducedMotion]);

  if (failed) {
    return (
      <div ref={containerRef} className={cn('relative h-full w-full', className)}>
        {useNextImage ? (
          <Image
            src={poster}
            alt={alt}
            fill
            sizes="100vw"
            className={cn('object-cover', mediaClassName)}
            priority
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt={alt}
            className={cn('h-full w-full object-cover', mediaClassName)}
            loading="eager"
          />
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={cn('relative h-full w-full', className)}>
      <video
        ref={videoRef}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        preload={preload}
        aria-label={alt}
        onCanPlay={() => setCanPlay(true)}
        onError={() => setFailed(true)}
        onStalled={() => setFailed(true)}
        className={cn('h-full w-full object-cover', mediaClassName)}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
    </div>
  );
}
