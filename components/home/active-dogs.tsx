import Link from 'next/link';
import { ArrowLeft, Mountain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/product/product-card';
import { PRODUCTS } from '@/lib/products';

const ACTIVE_DOG_PICKS = ['p1', 'p7', 'p2'] as const;

export default function ActiveDogs() {
  const picks = ACTIVE_DOG_PICKS
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (picks.length === 0) return null;

  return (
    <section className="bg-brand-dark text-white">
      <div className="container py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-3 lg:items-start">
          <div className="lg:pe-4">
            <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
              <Mountain className="h-3.5 w-3.5" /> קולקציית שטח
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight md:text-4xl">
              לכלבים פעילים במיוחד
            </h2>
            <p className="mt-4 text-slate-200 leading-relaxed">
              גזעים שרצים רחוק יותר, מושכים חזק יותר וצוללים עמוק יותר —
              צריכים ציוד שיעמוד בקצב. בחרנו עבורכם את הקולקציה המחוזקת
              ביותר שלנו: רתמות מרופדות, בקבוקי שתייה לדרך וצעצועים שלא נשברים.
            </p>
            <Button size="lg" variant="accent" asChild className="mt-6">
              <Link href="/collections/active-dogs">
                גלו את הקולקציה <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-2 lg:gap-6">
            {picks.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
