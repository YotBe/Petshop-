import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { BUNDLES } from '@/lib/bundles';
import BundleCard from '@/components/bundle/bundle-card';

export const metadata: Metadata = {
  title: 'ערכות ברוכים הבאים — פטשופ',
  description:
    'חבילות מסודרות לגורים, מאמצים וכלבים פעילים. כל הציוד החיוני יחד — בחיסכון אמיתי. מהמחסן שלנו בישראל, עם החזרה חינם תוך 30 יום.'
};

export default function BundlesPage() {
  return (
    <>
      <section className="bg-cream border-b border-slate-200">
        <div className="container py-14 md:py-20 max-w-2xl">
          <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            <Sparkles className="h-3.5 w-3.5" /> ערכות ברוכים הבאים
          </p>
          <h1 className="mt-2 font-display text-3xl md:text-5xl font-extrabold text-ink leading-tight">
            חבילות שכבר חשבנו עליהן בשבילכם
          </h1>
          <p className="mt-4 text-slate-700 leading-relaxed">
            ערכנו עבורכם את הציוד החיוני בחבילה אחת — חוסכים זמן וכסף,
            ומוודאים שלא נשכח כלום ביום הראשון של החבר החדש בבית.
          </p>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {BUNDLES.map((b) => (
            <BundleCard key={b.id} bundle={b} />
          ))}
        </div>
      </section>
    </>
  );
}
