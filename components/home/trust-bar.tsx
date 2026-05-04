import { Truck, RotateCcw, MessageCircle } from 'lucide-react';

const ITEMS = [
  {
    Icon: Truck,
    label: 'משלוח חינם מעל ₪199',
    sub: 'עד 3 ימי עסקים'
  },
  {
    Icon: RotateCcw,
    label: 'החזרה תוך 30 יום',
    sub: 'ללא שאלות'
  },
  {
    Icon: MessageCircle,
    label: 'שירות בעברית בוואטסאפ',
    sub: 'אנשים אמיתיים, לא בוטים'
  }
] as const;

export default function TrustBar() {
  return (
    <section
      aria-label="הבטחות שירות"
      className="bg-forest text-white"
    >
      <div className="container grid grid-cols-1 gap-5 py-6 sm:grid-cols-3 sm:gap-6 md:py-7">
        {ITEMS.map(({ Icon, label, sub }) => (
          <div
            key={label}
            className="flex items-center gap-3 sm:justify-center sm:text-start"
          >
            <span
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30"
              aria-hidden
            >
              <Icon className="h-5 w-5 text-white" strokeWidth={2.25} />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-bold leading-tight">{label}</div>
              <div className="mt-0.5 text-xs leading-tight text-white/80">{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
