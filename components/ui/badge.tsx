import * as React from 'react';
import { cn } from '@/lib/utils';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'sale' | 'outline' | 'success' | 'warning';
};

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const styles = {
    default: 'bg-slate-900 text-white',
    sale: 'bg-rose-600 text-white',
    outline: 'border border-slate-300 text-slate-700',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-800'
  }[variant];
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        styles,
        className
      )}
      {...props}
    />
  );
}
