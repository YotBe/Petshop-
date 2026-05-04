export type Category =
  | 'harnesses-leashes'
  | 'outdoor-gear'
  | 'interactive-toys'
  | 'training'
  | 'beds-furniture'
  | 'feeding';

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface ProductSpec {
  material: string;
  sizes: string[];
  weightRange: string;
  weatherproof?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** price in agorot (ILS) */
  price: number;
  /** original price in agorot, if on sale */
  originalPrice?: number;
  stockStatus: StockStatus;
  images: string[];
  category: Category;
  rating: number;
  reviewCount: number;
  spec: ProductSpec;
  /** admin-only: source URL for manual fulfillment */
  aliexpressUrl: string;
  pairsWith?: string[];
}

export interface CartItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface OrderLine {
  productId: string;
  title: string;
  quantity: number;
  price: number;
  aliexpressUrl: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  lines: OrderLine[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'fulfilled' | 'shipped';
}

export interface CategoryMeta {
  slug: Category;
  title: string;
  description: string;
  icon: string;
}
