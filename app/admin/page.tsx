import Link from 'next/link';
import { cookies } from 'next/headers';
import { ExternalLink, ShieldAlert } from 'lucide-react';
import { MOCK_ORDERS } from '@/lib/orders';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatILS } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
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

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold">הזמנות</h1>
      <p className="mt-1 text-slate-600">{MOCK_ORDERS.length} הזמנות ממתינות לטיפול.</p>

      <div className="mt-6 space-y-4">
        {MOCK_ORDERS.map((order) => (
          <div key={order.id} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold">{order.id}</span>
                  <Badge variant={order.status === 'pending' ? 'warning' : 'success'}>
                    {order.status === 'pending' ? 'ממתין' : order.status === 'fulfilled' ? 'טופל' : 'נשלח'}
                  </Badge>
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
                <h3 className="text-xs font-semibold uppercase text-slate-500">לקוח</h3>
                <p className="mt-1 text-sm font-medium">{order.customer.name}</p>
                <p className="text-sm text-slate-600">{order.customer.email}</p>
                <p className="text-sm text-slate-600">
                  {order.customer.address}, {order.customer.city} {order.customer.postalCode},{' '}
                  {order.customer.country}
                </p>
              </div>
              <div className="rounded-md bg-slate-50 p-3">
                <h3 className="text-xs font-semibold uppercase text-slate-500">פריטים</h3>
                <ul className="mt-1 space-y-2">
                  {order.lines.map((line) => (
                    <li key={line.productId} className="flex items-center justify-between gap-2 text-sm">
                      <span className="flex-1">
                        {line.quantity} × {line.title}
                      </span>
                      <a
                        href={line.aliexpressUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-md border border-orange-300 bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 hover:bg-orange-100"
                      >
                        הזמן ב-AliExpress <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
