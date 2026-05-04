import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      <Image
        src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=1920"
        alt="כלב פעיל בשביל הרים"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div className="relative container py-24 md:py-32 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
          עונה חדשה • נבדק בשטח
        </p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-6xl">
          ציוד פרימיום לחבר הפעיל שלך
        </h1>
        <p className="mt-4 text-lg text-slate-200">
          בנוי לגזעים בינוניים עד גדולים שמושכים חזק, רצים רחוק יותר וצוללים עמוק יותר.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <Link href="/products">קנה הכל <ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-white border-white/40 hover:bg-white/10">
            <Link href="/products?category=outdoor-gear">ציוד חוץ</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
