import { Truck, RotateCcw, MessageCircle, ShieldCheck } from 'lucide-react';

const ITEMS = [
  {
    Icon: Truck,
    label: 'משלוח חינם מעל ₪249',
    sub: 'עד 3 ימי עסקים'
  },
  {
    Icon: RotateCcw,
    label: 'החזרות קלות',
    sub: '30 יום, ללא שאלות'
  },
  {
    Icon: MessageCircle,
    label: 'שירות בעברית',
    sub: 'זמינים בוואטסאפ'
  },
  {
    Icon: ShieldCheck,
    label: 'תשלום מאובטח',
    sub: 'אשראי · Bit · Apple Pay'
  }
] as const;

export default function TrustBar() {
  return (
    <section aria-label="הבטחות שירות" className="bg-cream border-y border-slate-200">
      <div className="container grid grid-cols-2 gap-4 py-5 md:grid-cols-4 md:gap-6 md:py-6">
        {ITEMS.map(({ Icon, label, sub }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-sm ring-1 ring-slate-200">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-ink leading-tight">{label}</div>
              <div className="text-xs text-slate-500 leading-tight mt-0.5">{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
