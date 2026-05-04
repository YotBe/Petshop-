import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Mountain, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductGrid from '@/components/product/product-grid';
import { PRODUCTS } from '@/lib/products';
import { BUNDLES } from '@/lib/bundles';

export const metadata: Metadata = {
  title: 'ציוד פרימיום לכלבים אקטיביים — פטשופ',
  description:
    'קולקציית הציוד שלנו לכלבי עבודה, ספורט וציד: רתמות מחוזקות, בקבוקי שתייה לדרך, צעצועים שלא נשברים. הציוד שאנשי שטח ומאמני כלבים סומכים עליו.'
};

// Curated subset of the existing catalog framed for active/working dogs.
// NOTE: the brief originally asked for high-protein food, GPS collars and
// ergonomic running harnesses — those SKUs do not yet exist in the catalog.
// When you add them, drop their ids into ACTIVE_PRODUCT_IDS below.
const ACTIVE_PRODUCT_IDS = ['p1', 'p7', 'p2', 'p11', 'p4', 'p5'] as const;

const TRUST_BADGES = [
  { Icon: ShieldCheck, label: 'בדוק בשטח', sub: 'אלפי שעות שימוש' },
  { Icon: Award, label: 'משתמשים מקצוענים', sub: 'מאמנים, צבא, משטרה' },
  { Icon: Mountain, label: 'עמיד לשימוש אינטנסיבי', sub: 'גשם, חול, סלעים' },
  { Icon: Users, label: 'מומלץ ע״י מאמנים', sub: 'בורדר קולי · הזרון · GSD' }
] as const;

export default function ActiveDogsPage() {
  const products = ACTIVE_PRODUCT_IDS.map((id) =>
    PRODUCTS.find((p) => p.id === id)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const featuredBundle =
    BUNDLES.find((b) => b.audience === 'puller') ??
    BUNDLES.find((b) => b.slug === 'new-adopter') ??
    BUNDLES[0];

  return (
    <>
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <Image
          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1920&h=900&fit=crop"
          alt="כלב פעיל בשטח"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-l from-slate-900/85 via-slate-900/45 to-transparent"
        />
        <div className="relative container py-16 md:py-28 max-w-2xl">
          <p className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            <Mountain className="h-3.5 w-3.5" /> קולקציית פרימיום
          </p>
          <h1 className="mt-3 font-display text-[2rem] sm:text-4xl md:text-5xl font-extrabold leading-[1.1]">
            ציוד פרימיום
            <br />
            לכלבים אקטיביים
          </h1>
          <p className="mt-4 md:mt-5 text-base md:text-lg text-slate-200 leading-relaxed">
            עבור כלבי עבודה, ציד וספורט. הציוד שאנשי שטח ומאמני כלבים סומכים
            עליו — נבחר בקפידה, נבדק שעות בשטח, עמיד לשימוש אינטנסיבי.
          </p>
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
            <Button size="lg" variant="accent" asChild className="w-full sm:w-auto">
              <Link href="#products">
                ראו את הציוד <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto text-white border-white/40 hover:bg-white/10"
            >
              <Link href={`/bundles/${featuredBundle.slug}`}>
                ערכת ציוד אקטיבי
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section aria-label="הבטחות שירות" className="bg-cream border-y border-slate-200">
        <div className="container grid grid-cols-2 gap-4 py-5 md:grid-cols-4 md:gap-6 md:py-6">
          {TRUST_BADGES.map(({ Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-sm ring-1 ring-slate-200">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-ink leading-tight">
                  {label}
                </div>
                <div className="text-xs text-slate-500 leading-tight mt-0.5">
                  {sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="container py-12 md:py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            הציוד שעומד בקצב
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-ink">
            ערוכים לטיולים, אימונים וצידים
          </h2>
          <p className="mt-2 text-slate-600">
            מהרתמה לרכב ועד הבקבוק לדרך — קולקציה מצומצמת ומדויקת. אם
            הכלב הולך חזק, רץ רחוק או צולל עמוק, זה מה שצריך.
          </p>
        </div>

        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </section>

      <section className="bg-brand-dark text-white">
        <div className="container py-14 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <Badge variant="accent">חבילה מומלצת</Badge>
              <h2 className="mt-3 font-display text-2xl md:text-3xl font-extrabold leading-tight">
                {featuredBundle.title}
              </h2>
              <p className="mt-3 text-slate-200 leading-relaxed">
                {featuredBundle.description}
              </p>
              <Button
                size="lg"
                variant="accent"
                asChild
                className="mt-6 w-full sm:w-auto"
              >
                <Link href={`/bundles/${featuredBundle.slug}`}>
                  פרטי הערכה <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={featuredBundle.heroImage}
                alt={featuredBundle.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-cream p-6 md:p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            דברו איתנו
          </p>
          <h2 className="mt-2 text-xl md:text-2xl font-extrabold text-ink">
            לא בטוחים מה הכי מתאים לכלב שלכם?
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            שלחו לנו בוואטסאפ את הגזע, גיל ופעילות אופיינית — ונרכיב לכם רשימה
            מותאמת.
          </p>
          <Button size="lg" variant="accent" asChild className="mt-5">
            <Link href="https://wa.me/972558810183">דברו איתנו בוואטסאפ</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
