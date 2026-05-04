import Link from 'next/link';
import { Dog } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold">
            <Dog className="h-5 w-5 text-brand" />
            <span>פטשופ</span>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            ציוד פרימיום לחבר הפעיל שלך.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">קנייה</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/products">כל המוצרים</Link></li>
            <li><Link href="/products?category=harnesses-leashes">רתמות ורצועות</Link></li>
            <li><Link href="/products?category=outdoor-gear">ציוד חוץ</Link></li>
            <li><Link href="/products?category=interactive-toys">צעצועים</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">עזרה</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>משלוחים והחזרות</li>
            <li>מדריך מידות</li>
            <li>צרו קשר</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">הישארו מעודכנים</h4>
          <p className="mt-3 text-sm text-slate-600">
            מוצרים חדשים, מבצעים וביקורת ציוד מהשטח.
          </p>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} פטשופ. כל הזכויות שמורות.
      </div>
    </footer>
  );
}
