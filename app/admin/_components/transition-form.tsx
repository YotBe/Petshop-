'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { FulfillmentStatus } from '@/lib/types';
import { transitionFulfillmentAction } from '../actions';

const STATUS_LABEL: Record<FulfillmentStatus, string> = {
  pending: 'ממתין להזמנה',
  ordered_from_supplier: 'הוזמן מהספק',
  arrived_at_base: 'הגיע לבדיקה — סמן כנבדק',
  repackaged: 'נארז מחדש',
  shipped_to_customer: 'נשלח ללקוח'
};

export default function TransitionForm({
  orderId,
  targetStatus,
  primary = false,
  showSupplierTracking = false,
  showFinalTracking = false,
  showNotes = false,
  notifyByDefault = false,
  cta,
  className
}: {
  orderId: string;
  targetStatus: FulfillmentStatus;
  /** Render as the prominent accent button. */
  primary?: boolean;
  showSupplierTracking?: boolean;
  showFinalTracking?: boolean;
  showNotes?: boolean;
  notifyByDefault?: boolean;
  cta?: string;
  className?: string;
}) {
  const [pending, setPending] = useState(false);

  return (
    <form
      action={async (fd) => {
        setPending(true);
        try {
          await transitionFulfillmentAction(fd);
        } finally {
          setPending(false);
        }
      }}
      className={className}
    >
      <input type="hidden" name="orderId" value={orderId} />
      <input type="hidden" name="status" value={targetStatus} />

      {(showSupplierTracking || showFinalTracking || showNotes) && (
        <div className="mb-2 grid gap-2">
          {showSupplierTracking && (
            <Input
              name="supplierTrackingNumber"
              placeholder="מס׳ מעקב מהספק (לא חובה)"
              className="h-9 text-sm"
            />
          )}
          {showFinalTracking && (
            <Input
              name="finalTrackingNumber"
              placeholder="מס׳ מעקב סופי ללקוח (לא חובה)"
              className="h-9 text-sm"
            />
          )}
          {showNotes && (
            <Input
              name="notes"
              placeholder="הערות בקרת איכות (לא חובה)"
              className="h-9 text-sm"
            />
          )}
        </div>
      )}

      <label className="mb-2 inline-flex items-center gap-2 text-xs text-slate-600">
        <input
          type="checkbox"
          name="notify"
          defaultChecked={notifyByDefault}
          className="h-3.5 w-3.5"
        />
        שלח עדכון ללקוח (אימייל + SMS)
      </label>

      <Button
        type="submit"
        disabled={pending}
        variant={primary ? 'accent' : 'outline'}
        size={primary ? 'lg' : 'sm'}
        className="w-full"
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : primary ? (
          <CheckCircle2 className="h-4 w-4" />
        ) : null}
        {cta ?? STATUS_LABEL[targetStatus]}
      </Button>
    </form>
  );
}
