import { PRODUCTS, CATEGORIES } from '@/lib/products';
import ProductsExplorer, { type SortKey } from '@/components/product/products-explorer';

export default function ProductsPage({
  searchParams
}: {
  searchParams: { category?: string; q?: string; sort?: string };
}) {
  return (
    <div className="container py-10">
      <ProductsExplorer
        products={PRODUCTS}
        categories={CATEGORIES}
        initialCategory={searchParams.category}
        initialQ={searchParams.q}
        initialSort={searchParams.sort as SortKey | undefined}
      />
    </div>
  );
}
