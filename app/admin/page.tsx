import Link from 'next/link';
import { cookies } from 'next/headers';
import {
  ExternalLink,
  ShieldAlert,
  PackageOpen,
  Printer,
  Boxes,
  Plane,
  PackageCheck,
  Inbox,
  Truck
} from 'lucide-react';
import { MOCK_ORDERS } from '@/lib/orders';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatILS, cn } from '@/lib/utils';
import type { FulfillmentStatus, Order, OrderStatus } from '@/lib/types';
import TransitionForm from './_components/transition-form';
import CustomerUpdateButtons from './_components/customer-update-buttons';
import CopyShipping from './_components/copy-shipping';

const STATUS_LABEL: Record<OrderStatus, string> = {
  received: 'התקבלה',
  paid: 'שולמה',
  preparing: 'בהכנה',
  shipped: 'נשלחה',
  out_for_delivery: 'במשלוח',
  delivered: 'הגיעה',
  cancelled: 'בוטלה'
};
const STATUS_VARIANT: Record<
  OrderStatus,
  'warning' | 'success' | 'brand' | 'outline' | 'accent'
> = {
  received: 'warning',
  paid: 'brand',
  preparing: 'warning',
  shipped: 'brand',
  out_for_delivery: 'accent',
  delivered: 'success',
  cancelled: 'outline'
};

const FULFILL_LABEL: Record<FulfillmentStatus, string> = {
  pending: 'ממתין להזמנה מהספק',
  ordered_from_supplier: 'בדרך אלינו מהספק',
  arrived_at_base: 'הגיע לבסיס · בבדיקה',
  repackaged: 'נארז מחדש',
  shipped_to_customer: 'נשלח ללקוח'
};

type Tab = 'all' | 'to-order' | 'in-transit' | 'inspect' | 'pack' | 'ship';

const TABS: Array<{
  key: Tab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  match: (o: Order) => boolean;
}> = [
  { key: 'all', label: 'הכל', icon: Boxes, match: () => true },
  {
    key: 'to-order',
    label: 'יש להזמין מהספק',
    icon: Inbox,
    match: (o) => o.fulfillmentStatus === 'pending'
  },
  {
    key: 'in-transit',
    label: 'בדרך אלי',
    icon: Plane,
    match: (o) => o.fulfillmentStatus === 'ordered_from_supplier'
  },
  {
    key: 'inspect',
    label: 'הגיעו · לבדיקה',
    icon: PackageCheck,
    match: (o) => o.fulfillmentStatus === 'arrived_at_base'
  },
  {
    key: 'pack',
    label: 'מוכנים לאריזה',
    icon: PackageOpen,
    match: (o) => o.fulfillmentStatus === 'repackaged'
  },
  {
    key: 'ship',
    label: 'נשלחו',
    icon: Truck,
    match: (o) => o.fulfillmentStatus === 'shipped_to_customer'
  }
];

export const dynamic = 'force-dynamic';

export default function AdminPage({
  searchParams
}: {
  searchParams?: { tab?: string };
}) {
  const expected = process.env.ADMIN_PASSWORD;
  const provided = cookies().get('admin_pw')?.value;
  const authed = !expected || provided === expected;

  if (!authed) {
    return (
      <div className="container max-w-md py-20 text-center">
        <ShieldAlert className="mx-auto h-12 w-12 text-amber-500" />
        <h1 className="mt-3 text-2xl font-bold">גישת ניהול</h1>
        <p className="mt-2 text-slate-600">
          הגדירו את עוגיית <code className="font-mono text-xs">admin_pw</code> עם הערך
          של <code className="font-mono text-xs">ADMIN_PASSWORD</code> כדי לגשת לדף זה.
        </p>
        <Button asChild className="mt-6" variant="outline">
          <Link href="/">חזרה לדף הבית</Link>
        </Button>
      </div>
    );
  }

  const activeTab = (TABS.find((t) => t.key === searchParams?.tab)?.key ??
    'all') as Tab;
  const matcher = TABS.find((t) => t.key === activeTab)!.match;
  const orders = MOCK_ORDERS.filter(matcher);

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold">מרכז ניהול הזמנות</h1>
      <p className="mt-1 text-slate-600">
        מודל hybrid: הזמנה מהספק → בדיקה אישית בתל אביב → אריזה מחדש → משלוח ללקוח.
      </p>

      <nav
        className="mt-6 flex gap-1 overflow-x-auto no-scrollbar border-b border-slate-200"
        aria-label="סינון לפי סטטוס"
      >
        {TABS.map((tab) => {
          const count = MOCK_ORDERS.filter(tab.match).length;
          const Icon = tab.icon;
          const active = tab.key === activeTab;
          const href = tab.key === 'all' ? '/admin' : `/admin?tab=${tab.key}`;
          return (
            <Link
              key={tab.key}
              href={href}
              className={cn(
                'inline-flex items-center gap-2 whitespace-nowrap border-b-2 px-3 py-3 text-sm font-medium transition',
                active
                  ? 'border-brand text-brand'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              <span
                className={cn(
                  'inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-semibold',
                  active ? 'bg-brand text-white' : 'bg-slate-100 text-slate-700'
                )}
              >
                {count}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 space-y-4">
        {orders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            אין הזמנות בקטגוריה הזו.
          </div>
        ) : (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const fs = order.fulfillmentStatus;
  const shippingText = [
    order.customer.name,
    order.customer.phone,
    `${order.customer.address}, ${order.customer.city} ${order.customer.postalCode}`,
    order.customer.country
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm font-semibold">{order.id}</span>
            <Badge variant={STATUS_VARIANT[order.status]}>
              {STATUS_LABEL[order.status]}
            </Badge>
            <Badge variant="brand">{FULFILL_LABEL[fs]}</Badge>
            {order.trackingUrl && (
              <a
                href={order.trackingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-brand hover:underline"
              >
                מעקב <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-600">
            {new Date(order.createdAt).toLocaleString('he-IL')}
          </p>
        </div>
        <div className="text-end">
          <p className="text-sm text-slate-500">סה״כ הזמנה</p>
          <p className="text-lg font-bold">{formatILS(order.total)}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-md bg-slate-50 p-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xs font-semibold uppercase text-slate-500">לקוח</h3>
            <CopyShipping text={shippingText} />
          </div>
          <p className="mt-1 text-sm font-medium">{order.customer.name}</p>
          <p className="text-sm text-slate-600">{order.customer.email}</p>
          {order.customer.phone && (
            <p className="text-sm text-slate-600 num">{order.customer.phone}</p>
          )}
          <p className="text-sm text-slate-600">
            {order.customer.address}, {order.customer.city} {order.customer.postalCode},{' '}
            {order.customer.country}
          </p>

          {(order.supplierTrackingNumber || order.finalTrackingNumber) && (
            <div className="mt-3 grid grid-cols-1 gap-1 border-t border-slate-200 pt-3 text-xs text-slate-600">
              {order.supplierTrackingNumber && (
                <div>
                  ספק: <span className="font-mono">{order.supplierTrackingNumber}</span>
                </div>
              )}
              {order.finalTrackingNumber && (
                <div>
                  שליח: <span className="font-mono">{order.finalTrackingNumber}</span>
                </div>
              )}
            </div>
          )}

          {order.notes && (
            <div className="mt-3 rounded-md bg-amber-50 p-2 text-xs text-amber-900 ring-1 ring-amber-200">
              <span className="font-semibold">הערות פנימיות:</span> {order.notes}
            </div>
          )}
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <h3 className="text-xs font-semibold uppercase text-slate-500">פריטים</h3>
          <ul className="mt-1 space-y-2">
            {order.lines.map((line) => (
              <li
                key={`${line.productId}::${line.bundleId ?? ''}`}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <span className="flex-1 min-w-0">
                  <span className="block">
                    {line.quantity} × {line.title}
                  </span>
                  {line.bundleTitle && (
                    <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-cream px-1.5 py-0.5 text-[10px] font-semibold text-brand ring-1 ring-brand/20">
                      <PackageOpen className="h-2.5 w-2.5" />
                      {line.bundleTitle}
                    </span>
                  )}
                </span>
                <a
                  href={line.aliexpressUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-orange-300 bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 hover:bg-orange-100 shrink-0"
                >
                  הזמן ב-AliExpress <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <FulfillmentActions order={order} />
    </div>
  );
}

function FulfillmentActions({ order }: { order: Order }) {
  const fs = order.fulfillmentStatus;

  return (
    <div className="mt-4 grid gap-3 border-t border-slate-200 pt-4 md:grid-cols-2">
      {fs === 'pending' && (
        <TransitionForm
          orderId={order.id}
          targetStatus="ordered_from_supplier"
          showSupplierTracking
          cta="סמן כהוזמן מהספק"
          notifyByDefault
        />
      )}

      {fs === 'ordered_from_supplier' && (
        <TransitionForm
          orderId={order.id}
          targetStatus="arrived_at_base"
          primary
          cta="סמן כהגיע · נבדק אישית"
          notifyByDefault
        />
      )}

      {fs === 'arrived_at_base' && (
        <>
          <TransitionForm
            orderId={order.id}
            targetStatus="repackaged"
            showNotes
            cta="סמן כנארז מחדש"
            notifyByDefault
          />
          <Button asChild variant="outline" size="sm">
            <Link href={`/admin/label/${order.id}`} target="_blank">
              <Printer className="h-4 w-4" />
              הדפס פרטי משלוח
            </Link>
          </Button>
        </>
      )}

      {fs === 'repackaged' && (
        <TransitionForm
          orderId={order.id}
          targetStatus="shipped_to_customer"
          primary
          showFinalTracking
          cta="סמן כנשלח ללקוח"
          notifyByDefault
        />
      )}

      {fs === 'shipped_to_customer' && (
        <div className="md:col-span-2 rounded-md bg-emerald-50 p-3 text-sm text-emerald-800 ring-1 ring-emerald-200">
          ההזמנה נשלחה ללקוח. אין פעולות פתוחות.
        </div>
      )}

      {fs === 'arrived_at_base' && (
        <div className="md:col-span-2">
          <p className="mb-1 text-xs font-semibold text-slate-500">עדכון מהיר ללקוח</p>
          <CustomerUpdateButtons
            email={order.customer.email}
            phone={order.customer.phone}
            orderId={order.id}
            customerName={order.customer.name}
          />
        </div>
      )}
    </div>
  );
}
