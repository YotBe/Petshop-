import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Star } from 'lucide-react';
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
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-l from-slate-900/80 via-slate-900/40 to-transparent"
      />
      <div className="relative container py-16 md:py-32 max-w-2xl">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-accent">
          עונה חדשה · נבדק בשטח
        </p>
        <h1 className="mt-3 font-display text-[2rem] sm:text-4xl md:text-6xl font-extrabold leading-[1.1]">
          ציוד פרימיום
          <br />
          לחבר הפעיל שלך
        </h1>
        <p className="mt-4 md:mt-5 text-base md:text-lg text-slate-200 leading-relaxed">
          מהרתמה ועד הקערה — אנחנו בוחרים רק את הציוד שהיינו קונים לכלב שלנו.
          חנות ישראלית, שירות בעברית, משלוח מהיר עד הבית.
        </p>
        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
          <Button size="lg" variant="accent" asChild className="w-full sm:w-auto">
            <Link href="/products">
              קנו עכשיו <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="w-full sm:w-auto text-white border-white/40 hover:bg-white/10"
          >
            <Link href="/#categories">קנו לפי קטגוריה</Link>
          </Button>
        </div>
        <div className="mt-6 flex items-center gap-2 text-sm text-slate-200">
          <span className="inline-flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          </span>
          <span className="font-semibold">4.8</span>
          <span className="text-slate-300">·</span>
          <span>
            <span className="num">12,000+</span> לקוחות מרוצים
          </span>
        </div>
      </div>
    </section>
  );
}
