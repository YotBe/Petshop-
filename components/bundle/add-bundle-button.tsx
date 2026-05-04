'use client';

import { ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/cart-store';
import { cn } from '@/lib/utils';
import { track } from '@/lib/analytics';
import type { Bundle } from '@/lib/types';

export default function AddBundleButton({
  bundle,
  className,
  size = 'lg'
}: {
  bundle: Bundle;
  className?: string;
  size?: 'default' | 'lg' | 'sm';
}) {
  const addBundle = useCart((s) => s.addBundle);

  return (
    <Button
      variant="accent"
      size={size}
      className={cn('w-full', className)}
      onClick={() => {
        addBundle(bundle);
        track('add_bundle', {
          bundleId: bundle.id,
          price: bundle.price
        });
        toast.success('הערכה נוספה לעגלה!', {
          description: bundle.title
        });
      }}
    >
      <ShoppingBag className="h-4 w-4" />
      הוסיפו את הערכה לעגלה
    </Button>
  );
}
