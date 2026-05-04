import { cn } from '@/lib/utils';

/**
 * 'Sunny Field' discount stamp — bold circular dark overlapping element.
 * Renders the discount in LTR ('-40%') so the minus glyph never lands on
 * the wrong side of the percentage in an RTL parent.
 */
export function DiscountStamp({
  pct,
  size = 'md',
  className
}: {
  pct: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  if (pct <= 0) return null;
  const sizes = {
    sm: 'h-12 w-12 text-xs',
    md: 'h-14 w-14 text-sm',
    lg: 'h-16 w-16 text-base'
  }[size];

  return (
    <span
      dir="ltr"
      aria-label={`${pct}% הנחה`}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-ink text-white font-extrabold tracking-tight uppercase ring-4 ring-white shadow-md',
        sizes,
        className
      )}
    >
      {pct}%-
    </span>
  );
}
