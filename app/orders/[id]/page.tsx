import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Inbox,
  Search,
  PackageCheck,
  PackageOpen,
  Truck,
  Store,
  CheckCircle2,
  Clock,
  Heart,
  MessageCircle
} from 'lucide-react';
import { getOrder } from '@/lib/orders';
import { Button } from '@/components/ui/button';
import { formatILS, cn } from '@/lib/utils';
import { PICKUP_LOCATION } from '@/lib/delivery';
import type { FulfillmentStatus, Order } from '@/lib/types';

export const dynamic = 'force-dynamic';

type Phase = {
  key: 'received' | 'inspect' | 'pack' | 'on_the_way';
  title: string;
  blurb: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Which fulfillment statuses correspond to "completed" for this phase. */
  completedAt: FulfillmentStatus[];
  /** When the order is actively in this phase (current). */
  activeAt: FulfillmentStatus[];
};

function buildPhases(isPickup: boolean): Phase[] {
  return [
    {
      key: 'received',
      title: 'קיבלנו את ההזמנה',
      blurb: 'התחלנו לטפל בהזמנה האישית שלך.',
      icon: Inbox,
      completedAt: [
        'ordered_from_supplier',
        'arrived_at_base',
        'repackaged',
        'shipped_to_customer'
      ],
      activeAt: ['pending']
    },
    {
      key: 'inspect',
      title: 'בדיקת איכות אצלנו בתל אביב',
      blurb: 'הציוד שלך מגיע אלינו לבדיקה אישית — בלי קיצורי דרך.',
      icon: Search,
      completedAt: ['arrived_at_base', 'repackaged', 'shipped_to_customer'],
      activeAt: ['ordered_from_supplier']
    },
    {
      key: 'pack',
      title: 'אריזה מהלב',
      blurb: 'נארז יפה במיתוג פטשופ — לא סתם קופסה אנונימית.',
      icon: PackageOpen,
      completedAt: ['repackaged', 'shipped_to_customer'],
      activeAt: ['arrived_at_base']
    },
    isPickup
      ? {
          key: 'on_the_way',
          title: 'מוכן לאיסוף בתל אביב',
          blurb:
            'נסגור איתך מועד מדויק בוואטסאפ — קופצים אלינו, אומרים שלום, ואוספים את ההזמנה.',
          icon: Store,
          completedAt: ['shipped_to_customer'],
          activeAt: ['repackaged']
        }
      : {
          key: 'on_the_way',
          title: 'בדרך אלייך',
          blurb: 'יצא לשליח — מגיע ב-1-3 ימי עסקים.',
          icon: Truck,
          completedAt: ['shipped_to_customer'],
          activeAt: ['repackaged']
        }
  ];
}

function findActiveIndex(phases: Phase[], fs: FulfillmentStatus): number {
  if (fs === 'shipped_to_customer') return phases.length;
  return phases.findIndex((p) => p.activeAt.includes(fs));
}

export default function OrderTrackingPage({
  params
}: {
  params: { id: string };
}) {
  const order = getOrder(params.id);
  if (!order) return notFound();

  const fs = order.fulfillmentStatus;
  const isPickup = order.deliveryMethod === 'pickup';
  const phases = buildPhases(isPickup);
  const activeIdx = findActiveIndex(phases, fs);

  return (
    <div className="container max-w-3xl py-10">
      <header className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
          מעקב הזמנה
        </p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          תודה ש{order.customer.name.split(' ')[0]} בחר/ה בפטשופ
        </h1>
        <p className="mt-2 text-slate-600">
          הזמנה <span className="font-mono font-semibold">{order.id}</span> ·{' '}
          <span className="num">{formatILS(order.total)}</span>
        </p>
      </header>

      <ol className="mt-10 space-y-4">
        {phases.map((phase, i) => {
          const isCompleted = phase.completedAt.includes(fs);
          const isActive = i === activeIdx;
          const isFuture = !isCompleted && !isActive;
          const Icon = phase.icon;
          const timestamp =
            order.fulfillmentTimeline.find((t) =>
              [...phase.activeAt, ...phase.completedAt].includes(t.status)
            )?.at;

          return (
            <li
              key={phase.key}
              className={cn(
                'relative flex gap-4 rounded-xl border p-4 transition',
                isCompleted && 'border-emerald-200 bg-emerald-50/50',
                isActive && 'border-brand bg-cream shadow-sm ring-1 ring-brand/20',
                isFuture && 'border-slate-200 bg-white'
              )}
            >
              <div
                className={cn(
                  'mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                  isCompleted && 'bg-emerald-500 text-white',
                  isActive && 'bg-brand text-white',
                  isFuture && 'bg-slate-100 text-slate-400'
                )}
                aria-hidden
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : isActive ? (
                  <Icon className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2
                    className={cn(
                      'text-base font-bold sm:text-lg',
                      isFuture && 'text-slate-500'
                    )}
                  >
                    {phase.title}
                  </h2>
                  {timestamp && (
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      {new Date(timestamp).toLocaleString('he-IL')}
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    'mt-1 text-sm leading-relaxed',
                    isFuture ? 'text-slate-400' : 'text-slate-700'
                  )}
                >
                  {phase.blurb}
                </p>
                {isActive && phase.key === 'on_the_way' && !isPickup && order.trackingUrl && (
                  <Button asChild size="sm" variant="accent" className="mt-3">
                    <a href={order.trackingUrl} target="_blank" rel="noreferrer">
                      צפו במעקב המשלוח
                    </a>
                  </Button>
                )}
                {isActive && phase.key === 'on_the_way' && isPickup && (
                  <div className="mt-3 rounded-md bg-white p-3 text-xs text-slate-700 ring-1 ring-brand/20">
                    <p className="font-semibold text-ink">{PICKUP_LOCATION.address}</p>
                    <p className="mt-0.5">{PICKUP_LOCATION.hours}</p>
                  </div>
                )}
              </div>
            </li>
          );
        })}

        {fs === 'shipped_to_customer' && (
          <li className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
            <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
            <p className="mt-2 font-semibold text-emerald-900">
              {isPickup ? 'ההזמנה מוכנה לאיסוף!' : 'ההזמנה בדרך אלייך!'}
            </p>
            {isPickup ? (
              <p className="mt-1 text-sm text-emerald-800">
                ניצור איתך קשר בוואטסאפ לתיאום מועד.
              </p>
            ) : (
              order.finalTrackingNumber && (
                <p className="mt-1 text-sm text-emerald-800">
                  מס׳ מעקב:{' '}
                  <span className="font-mono">{order.finalTrackingNumber}</span>
                </p>
              )
            )}
          </li>
        )}
      </ol>

      <section className="mt-10 rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-start gap-3">
          <Heart className="h-6 w-6 shrink-0 text-accent" />
          <div>
            <h2 className="text-lg font-bold">למה זה לוקח קצת יותר?</h2>
            <p className="mt-2 leading-relaxed text-slate-700">
              אנחנו עסק משפחתי קטן עם כלבים משלנו, ואנחנו לא מוכנים לשלוח ציוד
              בלי לבדוק אותו קודם. כל פריט שמגיע אלינו לתל אביב נבדק במו ידינו —
              שאין קרעים, שהמידות נכונות, ושהאיכות היא בדיוק מה שהיינו רוצים
              לכלב שלנו. רק אז אנחנו אורזים בקופסת פטשופ ושולחים אלייך.
            </p>
            <p className="mt-3 leading-relaxed text-slate-700">
              זה אומר שההזמנה שלך לוקחת לפעמים יום-יומיים יותר —{' '}
              <span className="font-semibold">אבל מה שאתם מקבלים זה ציוד שעבר בקרת איכות אישית.</span>
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 rounded-xl bg-cream p-5 text-center">
        <p className="text-sm text-slate-700">שאלה? אנחנו זמינים בעברית בוואטסאפ.</p>
        <Button asChild size="lg" className="mt-3">
          <a
            href={`https://wa.me/972558810183?text=${encodeURIComponent(`היי פטשופ, יש לי שאלה על הזמנה ${order.id}`)}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            פנו אלינו בוואטסאפ
          </a>
        </Button>
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/products"
          className="text-sm text-brand underline-offset-4 hover:underline"
        >
          חזרה לחנות
        </Link>
      </div>
    </div>
  );
}
