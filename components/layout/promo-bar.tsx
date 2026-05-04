import { Truck, ShieldCheck, Headphones } from 'lucide-react';

export default function PromoBar() {
  return (
    <div className="bg-brand text-white text-xs">
      <div className="container flex items-center justify-center gap-6 py-2 overflow-x-auto whitespace-nowrap no-scrollbar">
        <span className="inline-flex items-center gap-1.5">
          <Truck className="h-3.5 w-3.5" /> משלוח חינם בהזמנה מעל ₪199
        </span>
        <span className="hidden sm:inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" /> אחריות מלאה תוך 30 יום
        </span>
        <span className="hidden md:inline-flex items-center gap-1.5">
          <Headphones className="h-3.5 w-3.5" /> תמיכה בעברית, ימים א׳–ה׳
        </span>
      </div>
    </div>
  );
}
