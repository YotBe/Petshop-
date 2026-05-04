import Link from 'next/link';
import { CheckCircle2, MapPin, Truck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getOrder } from '@/lib/orders';
import { PICKUP_LOCATION } from '@/lib/delivery';

export const dynamic = 'force-dynamic';

export default function SuccessPage({
  searchParams
}: {
  searchParams: { order?: string };
}) {
  const orderId = searchParams.order;
  const order = orderId ? getOrder(orderId) : undefined;
  const isPickup = order?.deliveryMethod === 'pickup';

  return (
    <div className="container py-20 max-w-lg text-center">
      <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
      <h1 className="mt-4 text-3xl font-bold">תודה על ההזמנה!</h1>
      <p className="mt-2 text-slate-600">
        מספר הזמנה:{' '}
        <span className="font-mono font-semibold">{orderId ?? 'בהמתנה'}</span>
      </p>

      {isPickup ? (
        <div className="mt-6 rounded-xl border border-slate-200 bg-cream p-5 text-start">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <div>
              <p className="font-semibold text-ink">איסוף עצמי בתל אביב</p>
              <p className="mt-1 text-sm text-slate-700">{PICKUP_LOCATION.address}</p>
              <p className="mt-0.5 text-sm text-slate-600">{PICKUP_LOCATION.hours}</p>
              <p className="mt-3 text-sm text-slate-700">
                ניצור איתך קשר בוואטסאפ לתיאום מועד מדויק ברגע שההזמנה מוכנה.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="mt-2 text-slate-600 inline-flex items-center gap-1.5">
          <Truck className="h-4 w-4 text-brand" />
          שלחנו אישור לאימייל. הציוד שלך מוכן למשלוח.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        {orderId && (
          <Button asChild>
            <Link href={`/orders/${orderId}`}>
              מעקב הזמנה <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
        )}
        <Button asChild variant="outline">
          <Link href="/products">המשך לקנות</Link>
        </Button>
      </div>
    </div>
  );
}
