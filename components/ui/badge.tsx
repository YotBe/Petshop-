import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'sale' | 'outline' | 'success' | 'warning' | 'accent' | 'brand' | 'bestseller';
};

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const styles = {
    default: 'bg-slate-900 text-white rounded-full px-2.5 py-0.5 text-xs',
    sale: 'bg-accent/90 text-white rounded-md px-2 py-0.5 text-[11px] tracking-tight shadow-sm ring-1 ring-white/20',
    accent: 'bg-accent text-white rounded-md px-2 py-0.5 text-[11px] tracking-tight',
    brand: 'bg-brand text-white rounded-full px-2.5 py-0.5 text-xs',
    bestseller: 'bg-amber-500 text-white rounded-full px-2.5 py-0.5 text-xs',
    outline: 'border border-slate-300 text-slate-700 rounded-full px-2.5 py-0.5 text-xs',
    success: 'bg-emerald-100 text-emerald-800 rounded-full px-2.5 py-0.5 text-xs',
    warning: 'bg-amber-100 text-amber-800 rounded-full px-2.5 py-0.5 text-xs'
  }[variant];
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold whitespace-nowrap',
        styles,
        className
      )}
      {...props}
    />
  );
}
