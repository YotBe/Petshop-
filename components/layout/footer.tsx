import Link from 'next/link';
import { Mail, MessageCircle, Clock, Instagram, Facebook, PawPrint } from 'lucide-react';

const PAYMENT_METHODS = ['Visa', 'Mastercard', 'Amex', 'Bit', 'PayPal', 'Apple Pay', 'Google Pay'];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-slate-200">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <section id="about" className="scroll-mt-20">
          <div className="flex items-center gap-2 font-extrabold text-white">
            <PawPrint className="h-5 w-5 text-accent" />
            <span className="font-display text-lg">פטופיה</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            חנות ישראלית לציוד פרימיום לחיות מחמד. אנחנו זוג עם שני כלבים שהקימו
            את החנות שתמיד חיפשנו: ציוד עמיד שעובר בדיקה אישית, מחירים הוגנים
            ושירות בעברית.
          </p>
        </section>

        <section>
          <h4 className="text-sm font-semibold text-white">חנות</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-white">כל המוצרים</Link></li>
            <li><Link href="/#deals" className="hover:text-white">מבצעים</Link></li>
            <li><Link href="/#top-rated" className="hover:text-white">הכי מדורג</Link></li>
            <li><Link href="/products?category=harnesses-leashes" className="hover:text-white">רתמות ורצועות</Link></li>
            <li><Link href="/products?category=outdoor-gear" className="hover:text-white">ציוד חוץ</Link></li>
          </ul>
        </section>

        <section>
          <h4 className="text-sm font-semibold text-white">שירות</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/#contact" className="hover:text-white">שאלות נפוצות</Link></li>
            <li><Link href="/#contact" className="hover:text-white">משלוחים והחזרות</Link></li>
            <li><Link href="/#contact" className="hover:text-white">טבלת מידות</Link></li>
            <li><Link href="/#contact" className="hover:text-white">מדיניות פרטיות</Link></li>
            <li><Link href="/#contact" className="hover:text-white">תקנון</Link></li>
          </ul>
        </section>

        <section id="contact" className="scroll-mt-20">
          <h4 className="text-sm font-semibold text-white">דברו איתנו</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              <a href="mailto:hello@petopia.co.il" className="hover:text-white">
                hello@petopia.co.il
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-accent" />
              <span>וואטסאפ: <span className="num">050-0000000</span></span>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" />
              <span>א׳–ה׳ <span className="num">9:00–18:00</span></span>
            </li>
          </ul>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </section>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-5 md:flex-row">
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {PAYMENT_METHODS.map((m) => (
              <li
                key={m}
                className="rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/90"
              >
                {m}
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-400">
            © <span className="num">{year}</span> פטופיה · כל הזכויות שמורות
          </p>
        </div>
      </div>
    </footer>
  );
}
