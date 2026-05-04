import { PRODUCTS } from './products';
import type { Bundle, Product } from './types';

export const BUNDLES: Bundle[] = [
  {
    id: 'b-puppy-starter',
    slug: 'puppy-starter',
    title: 'ערכת גור חדש',
    audience: 'puppy',
    description:
      'כל מה שצריך לימים הראשונים בבית: רתמה בטוחה, שתייה לדרך, פאזל האכלה איטית וצעצוע EVA רך לחניכיים — חבילה אחת מסודרת.',
    heroImage: '/products/IMG_3786.jpeg',
    items: [
      { productId: 'p1', quantity: 1 },
      { productId: 'p7', quantity: 1 },
      { productId: 'p8', quantity: 1 },
      { productId: 'p4', quantity: 1 }
    ],
    price: 6499,
    badge: 'חיסכון של ₪16'
  },
  {
    id: 'b-new-adopter',
    slug: 'new-adopter',
    title: 'ערכת מאמצים',
    audience: 'new-adopter',
    description:
      'התקנו את הבית לחבר חדש: מיטה רכה, רתמת בטיחות לרכב, בקבוק שתייה ניידת ופריזבי אימונים — חבילה אחת בחיסכון.',
    heroImage: '/products/IMG_3775.jpeg',
    items: [
      { productId: 'p1', quantity: 1 },
      { productId: 'p3', quantity: 1 },
      { productId: 'p7', quantity: 1 },
      { productId: 'p11', quantity: 1 }
    ],
    price: 7999,
    badge: 'חיסכון של ₪19'
  }
];

export function getBundle(idOrSlug: string): Bundle | undefined {
  return BUNDLES.find((b) => b.id === idOrSlug || b.slug === idOrSlug);
}

export function bundleProducts(
  bundle: Bundle
): Array<{ product: Product; quantity: number }> {
  return bundle.items
    .map((it) => {
      const product = PRODUCTS.find((p) => p.id === it.productId);
      return product ? { product, quantity: it.quantity } : null;
    })
    .filter((x): x is { product: Product; quantity: number } => Boolean(x));
}

export function bundleListPrice(bundle: Bundle): number {
  return bundleProducts(bundle).reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0
  );
}

export function bundleSavings(bundle: Bundle): number {
  return Math.max(0, bundleListPrice(bundle) - bundle.price);
}

/**
 * Distributes the bundle price across each product proportionally to its
 * catalog price. The last item absorbs rounding so the per-line total
 * always sums back to bundle.price exactly. Returns price-per-unit (agorot).
 */
export function allocateBundlePrices(bundle: Bundle): Map<string, number> {
  const items = bundleProducts(bundle);
  const list = items.reduce(
    (s, { product, quantity }) => s + product.price * quantity,
    0
  );
  const factor = list > 0 ? bundle.price / list : 0;
  const map = new Map<string, number>();
  let allocatedTotal = 0;

  items.forEach(({ product, quantity }, i) => {
    let perUnit: number;
    if (i === items.length - 1) {
      const remaining = bundle.price - allocatedTotal;
      perUnit = Math.max(0, Math.round(remaining / quantity));
    } else {
      perUnit = Math.max(0, Math.round(product.price * factor));
    }
    map.set(product.id, perUnit);
    allocatedTotal += perUnit * quantity;
  });

  return map;
}
