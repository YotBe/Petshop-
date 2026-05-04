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

export type BundleAudience = 'puppy' | 'new-adopter' | 'senior' | 'puller';

export interface BundleItem {
  productId: string;
  quantity: number;
}

export interface Bundle {
  id: string;
  slug: string;
  title: string;
  audience: BundleAudience;
  description: string;
  heroImage: string;
  items: BundleItem[];
  /** hand-set bundle price in agorot (the discount lives here) */
  price: number;
  /** marketing chip, e.g. "חיסכון של ₪89" */
  badge?: string;
}

export interface CartItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  /** set when this line came from a Bundle.addBundle action */
  bundleId?: string;
  /** denormalized for render; canonical title is in BUNDLES on the server */
  bundleTitle?: string;
}

export interface OrderLine {
  productId: string;
  title: string;
  quantity: number;
  price: number;
  aliexpressUrl: string;
  bundleId?: string;
  bundleTitle?: string;
}

export type OrderStatus =
  | 'received'
  | 'paid'
  | 'preparing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderTimelineEntry {
  status: OrderStatus;
  at: string;
  note?: string;
}

/**
 * Internal supply-chain state for our hybrid fulfillment model:
 * supplier → our Tel Aviv base → repackage → customer.
 * Orthogonal to OrderStatus (which is the customer-visible lifecycle).
 */
export type FulfillmentStatus =
  | 'pending'
  | 'ordered_from_supplier'
  | 'arrived_at_base'
  | 'repackaged'
  | 'shipped_to_customer';

export interface FulfillmentTimelineEntry {
  status: FulfillmentStatus;
  at: string;
  note?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  lines: OrderLine[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  timeline: OrderTimelineEntry[];
  trackingUrl?: string;
  trackingCarrier?: string;
  /** Internal supply-chain state. */
  fulfillmentStatus: FulfillmentStatus;
  fulfillmentTimeline: FulfillmentTimelineEntry[];
  /** Tracking number from the supplier (e.g. AliExpress) for the Tel Aviv leg. */
  supplierTrackingNumber?: string;
  /** Tracking number for the final leg from our base to the customer. */
  finalTrackingNumber?: string;
  /** Internal notes — QC findings, repackaging issues, etc. Not customer-visible. */
  notes?: string;
}

export interface CategoryMeta {
  slug: Category;
  title: string;
  description: string;
  icon: string;
}
