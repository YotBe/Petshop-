import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, PackageOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { bundleProducts, bundleListPrice, bundleSavings } from '@/lib/bundles';
import { formatILS } from '@/lib/utils';
import AddBundleButton from './add-bundle-button';
import type { Bundle } from '@/lib/types';

function shortTitle(t: string) {
  // First clause before "—" or "-" so chip rows stay tidy
  const head = t.split('—')[0].split(' - ')[0].trim();
  return head.length > 28 ? `${head.slice(0, 27)}…` : head;
}

export default function BundleCard({ bundle }: { bundle: Bundle }) {
  const items = bundleProducts(bundle);
  const list = bundleListPrice(bundle);
  const savings = bundleSavings(bundle);
  const itemsTotal = items.reduce((n, it) => n + it.quantity, 0);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_4px_20px_-8px_rgba(15,23,42,0.08)] transition hover:shadow-[0_8px_28px_-8px_rgba(15,23,42,0.18)]">
      <Link
        href={`/bundles/${bundle.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-slate-50"
      >
        <Image
          src={bundle.heroImage}
          alt={bundle.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent"
        />
        {bundle.badge && (
          <div className="absolute end-3 top-3">
            <Badge variant="sale">{bundle.badge}</Badge>
          </div>
        )}
        <div className="absolute start-3 top-3 inline-flex items-center gap-1 rounded-md bg-white/90 px-2 py-1 text-[11px] font-bold text-ink shadow-sm backdrop-blur">
          <PackageOpen className="h-3 w-3 text-brand" />
          ערכה · <span className="num">{itemsTotal}</span> פריטים
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-extrabold text-ink">
          {bundle.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          {bundle.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {items.map(({ product }) => (
            <li
              key={product.id}
              className="inline-flex rounded-full bg-cream px-2.5 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-slate-200"
            >
              {shortTitle(product.title)}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="num whitespace-nowrap text-2xl font-extrabold text-accent">
                {formatILS(bundle.price)}
              </span>
              {list > bundle.price && (
                <span className="num whitespace-nowrap text-sm text-slate-400 line-through">
                  {formatILS(list)}
                </span>
              )}
            </div>
            {savings > 0 && (
              <div className="mt-0.5 text-xs text-slate-500">
                חוסכים <span className="num font-semibold text-ink">{formatILS(savings)}</span> מהמחיר הרגיל
              </div>
            )}
          </div>
          <Link
            href={`/bundles/${bundle.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-dark"
          >
            פרטים <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-4">
          <AddBundleButton bundle={bundle} />
        </div>
      </div>
    </article>
  );
}
