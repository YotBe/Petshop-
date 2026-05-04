import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Truck, RotateCcw, ShieldCheck, PackageOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  BUNDLES,
  bundleListPrice,
  bundleProducts,
  bundleSavings,
  getBundle
} from '@/lib/bundles';
import AddBundleButton from '@/components/bundle/add-bundle-button';
import { formatILS } from '@/lib/utils';

export function generateStaticParams() {
  return BUNDLES.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({
  params
}: {
  params: { slug: string };
}): Metadata {
  const bundle = getBundle(params.slug);
  if (!bundle) return { title: 'ערכה לא נמצאה — פטשופ' };
  return {
    title: `${bundle.title} — פטשופ`,
    description: bundle.description
  };
}

export default function BundlePage({
  params
}: {
  params: { slug: string };
}) {
  const bundle = getBundle(params.slug);
  if (!bundle) return notFound();

  const items = bundleProducts(bundle);
  const list = bundleListPrice(bundle);
  const savings = bundleSavings(bundle);
  const itemsTotal = items.reduce((n, it) => n + it.quantity, 0);

  return (
    <div className="container py-10 pb-28 md:pb-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-50">
          <Image
            src={bundle.heroImage}
            alt={bundle.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {bundle.badge && (
            <div className="absolute end-3 top-3">
              <Badge variant="sale">{bundle.badge}</Badge>
            </div>
          )}
          <div className="absolute start-3 top-3 inline-flex items-center gap-1 rounded-md bg-white/90 px-2.5 py-1 text-xs font-bold text-ink shadow-sm backdrop-blur">
            <PackageOpen className="h-3.5 w-3.5 text-brand" />
            ערכה · <span className="num">{itemsTotal}</span> פריטים
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
            ערכת ברוכים הבאים
          </p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl font-extrabold text-ink leading-tight">
            {bundle.title}
          </h1>
          <p className="mt-3 text-slate-700 leading-relaxed">
            {bundle.description}
          </p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="num whitespace-nowrap text-3xl font-extrabold text-accent">
              {formatILS(bundle.price)}
            </span>
            {list > bundle.price && (
              <span className="num whitespace-nowrap text-slate-400 line-through">
                {formatILS(list)}
              </span>
            )}
          </div>
          {savings > 0 && (
            <p className="mt-1 text-sm text-slate-600">
              חוסכים{' '}
              <span className="num font-semibold text-ink">
                {formatILS(savings)}
              </span>{' '}
              מהמחיר הרגיל של הפריטים בנפרד.
            </p>
          )}

          <div className="mt-6">
            <AddBundleButton bundle={bundle} className="sm:w-auto" />
          </div>

          <ul className="mt-6 grid grid-cols-3 gap-3 text-xs text-slate-600">
            <li className="flex flex-col items-center rounded-lg border border-slate-200 p-3 text-center">
              <Truck className="h-5 w-5 text-brand" />
              <span className="mt-1 leading-tight">משלוח מהיר מהארץ</span>
            </li>
            <li className="flex flex-col items-center rounded-lg border border-slate-200 p-3 text-center">
              <RotateCcw className="h-5 w-5 text-brand" />
              <span className="mt-1 leading-tight">החזרה חינם 30 יום</span>
            </li>
            <li className="flex flex-col items-center rounded-lg border border-slate-200 p-3 text-center">
              <ShieldCheck className="h-5 w-5 text-brand" />
              <span className="mt-1 leading-tight">תשלום מאובטח</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl md:text-2xl font-extrabold text-ink">
          מה כלול בערכה
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          כל פריט ניתן גם בנפרד — לחצו לפרטים מלאים.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ product, quantity }) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)] transition hover:shadow-[0_8px_28px_-8px_rgba(15,23,42,0.18)]"
            >
              <div className="relative aspect-square bg-slate-50">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-contain p-3 transition group-hover:scale-[1.04]"
                />
                <div className="absolute end-2.5 top-2.5">
                  <span className="inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-brand px-2 text-[11px] font-bold text-white">
                    ×<span className="num">{quantity}</span>
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="line-clamp-2 text-sm font-semibold text-ink">
                  {product.title}
                </p>
                <span className="num whitespace-nowrap mt-2 text-sm text-slate-500">
                  {formatILS(product.price)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
