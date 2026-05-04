import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white">
      <Image
        src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=1920"
        alt="Active dog on a mountain trail"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-50"
      />
      <div className="relative container py-24 md:py-32 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
          New season • trail-tested
        </p>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight md:text-6xl">
          Premium Gear for Your Active Companion
        </h1>
        <p className="mt-4 text-lg text-slate-200">
          Built for medium-to-large breeds who pull harder, run further, and dive deeper.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <Link href="/products">Shop All <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="text-white border-white/40 hover:bg-white/10">
            <Link href="/products?category=outdoor-gear">Outdoor Gear</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
