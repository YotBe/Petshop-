import { notFound } from 'next/navigation';
import { Star, Truck, ShieldCheck, Undo2 } from 'lucide-react';
import { getProduct, getRelated, PRODUCTS } from '@/lib/products';
import ProductGallery from '@/components/product/product-gallery';
import FrequentlyBoughtTogether from '@/components/product/frequently-bought-together';
import AddToCartButton from './add-to-cart-button';
import { Badge } from '@/components/ui/badge';
import { discountPct, formatUSD } from '@/lib/utils';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);
  if (!product) return notFound();
  const related = getRelated(product.id);
  const pct = discountPct(product.price, product.originalPrice);

  return (
    <div className="container py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <ProductGallery images={product.images} alt={product.title} />

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {pct > 0 && <Badge variant="sale">Save {pct}%</Badge>}
            <Badge variant="outline">
              {product.stockStatus === 'in-stock'
                ? 'In stock'
                : product.stockStatus === 'low-stock'
                  ? 'Low stock'
                  : 'Sold out'}
            </Badge>
          </div>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">{product.title}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-900">{product.rating.toFixed(1)}</span>
            <span>({product.reviewCount.toLocaleString()} reviews)</span>
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold">{formatUSD(product.price)}</span>
            {product.originalPrice && (
              <span className="text-slate-400 line-through">
                {formatUSD(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="mt-4 text-slate-700">{product.description}</p>

          <AddToCartButton productId={product.id} />

          <ul className="mt-6 grid grid-cols-3 gap-3 text-xs text-slate-600">
            <li className="flex flex-col items-center rounded-lg border border-slate-200 p-3 text-center">
              <Truck className="h-5 w-5 text-brand" />
              <span className="mt-1">Free shipping over $50</span>
            </li>
            <li className="flex flex-col items-center rounded-lg border border-slate-200 p-3 text-center">
              <ShieldCheck className="h-5 w-5 text-brand" />
              <span className="mt-1">Trail-tested guarantee</span>
            </li>
            <li className="flex flex-col items-center rounded-lg border border-slate-200 p-3 text-center">
              <Undo2 className="h-5 w-5 text-brand" />
              <span className="mt-1">30-day returns</span>
            </li>
          </ul>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-base font-semibold">Specs</h2>
            <dl className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Material</dt>
                <dd className="font-medium">{product.spec.material}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Sizes</dt>
                <dd className="font-medium">{product.spec.sizes.join(' · ')}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Recommended for dogs</dt>
                <dd className="font-medium">{product.spec.weightRange}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Weatherproof</dt>
                <dd className="font-medium">{product.spec.weatherproof ? 'Yes' : 'No'}</dd>
              </div>
            </dl>

            <h3 className="mt-5 text-sm font-semibold">Size chart (chest girth)</h3>
            <div className="mt-2 overflow-hidden rounded-md border border-slate-200 text-sm">
              <table className="w-full">
                <thead className="bg-slate-50 text-left text-slate-500">
                  <tr>
                    <th className="px-3 py-2">Size</th>
                    <th className="px-3 py-2">Chest girth</th>
                    <th className="px-3 py-2">Dog weight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t"><td className="px-3 py-2">S</td><td className="px-3 py-2">16–20"</td><td className="px-3 py-2">15–30 lb</td></tr>
                  <tr className="border-t"><td className="px-3 py-2">M</td><td className="px-3 py-2">20–26"</td><td className="px-3 py-2">30–60 lb</td></tr>
                  <tr className="border-t"><td className="px-3 py-2">L</td><td className="px-3 py-2">26–32"</td><td className="px-3 py-2">60–90 lb</td></tr>
                  <tr className="border-t"><td className="px-3 py-2">XL</td><td className="px-3 py-2">32–40"</td><td className="px-3 py-2">90–130 lb</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <FrequentlyBoughtTogether base={product} related={related} />
      </div>
    </div>
  );
}
