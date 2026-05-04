import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { getOrder } from '@/lib/orders';
import { Button } from '@/components/ui/button';
import { formatILS } from '@/lib/utils';
import PrintTrigger from '../../_components/print-trigger';

export const dynamic = 'force-dynamic';

export default function LabelPage({ params }: { params: { id: string } }) {
  const expected = process.env.ADMIN_PASSWORD;
  const provided = cookies().get('admin_pw')?.value;
  const authed = !expected || provided === expected;
  if (!authed) {
    return (
      <div className="container max-w-md py-20 text-center">
        <ShieldAlert className="mx-auto h-12 w-12 text-amber-500" />
        <h1 className="mt-3 text-2xl font-bold">גישת ניהול</h1>
      </div>
    );
  }

  const order = getOrder(params.id);
  if (!order) return notFound();

  return (
    <div className="container max-w-2xl py-8 print:py-0">
      <div className="mb-4 flex items-center justify-between print:hidden">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin">חזרה</Link>
        </Button>
        <PrintTrigger />
      </div>

      <div className="rounded-xl border-2 border-slate-900 bg-white p-6 print:border print:rounded-none print:p-4">
        <div className="flex items-start justify-between border-b-2 border-slate-900 pb-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-accent">
              פטשופ · תל אביב
            </div>
            <div className="mt-1 text-xs text-slate-600">
              hello@petshop.co.il · wa.me/972558810183
            </div>
          </div>
          <div className="text-end">
            <div className="text-xs text-slate-500">הזמנה</div>
            <div className="font-mono text-lg font-bold">{order.id}</div>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            נמען
          </div>
          <div className="mt-1 text-2xl font-bold leading-tight">
            {order.customer.name}
          </div>
          <div className="mt-2 text-base leading-relaxed">
            {order.customer.address}
            <br />
            {order.customer.city} {order.customer.postalCode}
            <br />
            {order.customer.country}
          </div>
          {order.customer.phone && (
            <div className="mt-2 text-sm">
              טלפון: <span className="num font-semibold">{order.customer.phone}</span>
            </div>
          )}
        </div>

        <div className="mt-5 border-t border-slate-300 pt-4">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            תוכן החבילה
          </div>
          <ul className="mt-1 space-y-1 text-sm">
            {order.lines.map((l) => (
              <li
                key={`${l.productId}::${l.bundleId ?? ''}`}
                className="flex justify-between gap-3"
              >
                <span>
                  {l.quantity} × {l.title}
                </span>
                <span className="num shrink-0 text-slate-500">
                  {formatILS(l.price * l.quantity)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {(order.supplierTrackingNumber || order.finalTrackingNumber) && (
          <div className="mt-4 border-t border-slate-300 pt-3 text-xs text-slate-700">
            {order.supplierTrackingNumber && (
              <div>
                מעקב ספק:{' '}
                <span className="font-mono">{order.supplierTrackingNumber}</span>
              </div>
            )}
            {order.finalTrackingNumber && (
              <div>
                מעקב סופי:{' '}
                <span className="font-mono">{order.finalTrackingNumber}</span>
              </div>
            )}
          </div>
        )}

        <div className="mt-5 rounded-md bg-cream p-3 text-xs leading-relaxed text-slate-700 print:bg-white print:p-0">
          נארז ידנית ע&quot;י צוות פטשופ בתל אביב. כל פריט נבדק לפני אריזה.
        </div>
      </div>
    </div>
  );
}
