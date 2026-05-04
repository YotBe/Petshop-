import { notFound } from 'next/navigation';
import { Star, Truck, ShieldCheck, Heart } from 'lucide-react';
import { getProduct, getRelated, PRODUCTS } from '@/lib/products';
import ProductGallery from '@/components/product/product-gallery';
import FrequentlyBoughtTogether from '@/components/product/frequently-bought-together';
import Reviews from '@/components/product/reviews';
import AddToCartButton from './add-to-cart-button';
import { Badge } from '@/components/ui/badge';
import { discountPct, formatILS } from '@/lib/utils';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);
  if (!product) return notFound();
  const related = getRelated(product.id);
  const pct = discountPct(product.price, product.originalPrice);
  const showSizeChart = product.category === 'harnesses-leashes';

  return (
    <div className="container py-10">
      <div className="grid gap-10 md:grid-cols-2">
        <ProductGallery images={product.images} alt={product.title} />

        <div className="flex flex-col min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {pct > 0 && <Badge variant="sale">חסכו {pct}%</Badge>}
            <Badge variant="outline">
              {product.stockStatus === 'in-stock'
                ? 'במלאי'
                : product.stockStatus === 'low-stock'
                  ? 'מלאי נמוך'
                  : 'אזל מהמלאי'}
            </Badge>
          </div>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl md:text-4xl">{product.title}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-900">{product.rating.toFixed(1)}</span>
            <span>({product.reviewCount.toLocaleString('he-IL')} ביקורות)</span>
          </div>

          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-bold">{formatILS(product.price)}</span>
            {product.originalPrice && (
              <span className="text-slate-400 line-through">
                {formatILS(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="mt-4 text-slate-700 leading-relaxed">{product.description}</p>

          <AddToCartButton productId={product.id} />

          <ul className="mt-6 grid grid-cols-3 gap-3 text-xs text-slate-600">
            <li className="flex flex-col items-center rounded-lg border border-slate-200 p-3 text-center">
              <ShieldCheck className="h-5 w-5 text-brand" />
              <span className="mt-1 leading-tight">תשלום מאובטח ב-Stripe</span>
            </li>
            <li className="flex flex-col items-center rounded-lg border border-slate-200 p-3 text-center">
              <Truck className="h-5 w-5 text-brand" />
              <span className="mt-1 leading-tight">משלוחים לכל הארץ</span>
            </li>
            <li className="flex flex-col items-center rounded-lg border border-slate-200 p-3 text-center">
              <Heart className="h-5 w-5 text-brand" />
              <span className="mt-1 leading-tight">נבחר בקפידה</span>
            </li>
          </ul>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-base font-semibold">מפרט</h2>
            <dl className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">חומר</dt>
                <dd className="font-medium">{product.spec.material}</dd>
              </div>
              <div>
                <dt className="text-slate-500">מידות זמינות</dt>
                <dd className="font-medium">{product.spec.sizes.join(' · ')}</dd>
              </div>
              <div>
                <dt className="text-slate-500">מתאים לכלבים במשקל</dt>
                <dd className="font-medium">{product.spec.weightRange}</dd>
              </div>
              <div>
                <dt className="text-slate-500">עמיד למזג אוויר</dt>
                <dd className="font-medium">{product.spec.weatherproof ? 'כן' : 'לא'}</dd>
              </div>
            </dl>

            {showSizeChart && (
              <>
                <h3 className="mt-5 text-sm font-semibold">טבלת מידות (היקף חזה)</h3>
                <div className="mt-2 overflow-x-auto rounded-md border border-slate-200 text-sm">
                  <table className="w-full min-w-[420px]">
                    <thead className="bg-slate-50 text-start text-slate-500">
                      <tr>
                        <th className="px-3 py-2 text-start">מידה</th>
                        <th className="px-3 py-2 text-start">היקף חזה</th>
                        <th className="px-3 py-2 text-start">משקל כלב</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t"><td className="px-3 py-2">S</td><td className="px-3 py-2">40–50 ס״מ</td><td className="px-3 py-2">7–14 ק״ג</td></tr>
                      <tr className="border-t"><td className="px-3 py-2">M</td><td className="px-3 py-2">50–66 ס״מ</td><td className="px-3 py-2">14–27 ק״ג</td></tr>
                      <tr className="border-t"><td className="px-3 py-2">L</td><td className="px-3 py-2">66–81 ס״מ</td><td className="px-3 py-2">27–41 ק״ג</td></tr>
                      <tr className="border-t"><td className="px-3 py-2">XL</td><td className="px-3 py-2">81–102 ס״מ</td><td className="px-3 py-2">41–59 ק״ג</td></tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <FrequentlyBoughtTogether base={product} related={related} />
      </div>

      <div className="mt-8">
        <Reviews productId={product.id} rating={product.rating} count={product.reviewCount} />
      </div>
    </div>
  );
}
