import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { BUNDLES } from '@/lib/bundles';
import BundleCard from '@/components/bundle/bundle-card';

export default function WelcomeHomeBundles() {
  if (BUNDLES.length === 0) return null;

  return (
    <section id="bundles" className="bg-cream">
      <div className="container py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
              <Sparkles className="h-3.5 w-3.5" /> ערכות ברוכים הבאים
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-ink">
              חבילות מסודרות לבית חדש
            </h2>
            <p className="mt-2 text-slate-600">
              ערכנו עבורכם את הציוד החיוני בחבילה אחת — חוסכים זמן וכסף,
              ומוודאים שלא נשכח כלום ביום הראשון.
            </p>
          </div>
          <Link
            href="/bundles"
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-dark"
          >
            כל הערכות <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {BUNDLES.map((b) => (
            <BundleCard key={b.id} bundle={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
