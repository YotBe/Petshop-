import type { Product, CategoryMeta } from './types';

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: 'harnesses-leashes',
    title: 'Harnesses & Leashes',
    description: 'No-pull, escape-proof, all-day comfort.',
    icon: 'Shield'
  },
  {
    slug: 'outdoor-gear',
    title: 'Outdoor Gear',
    description: 'Built for the trail, the lake, and beyond.',
    icon: 'Mountain'
  },
  {
    slug: 'interactive-toys',
    title: 'Interactive Toys',
    description: 'Burn energy. Beat boredom.',
    icon: 'Gamepad2'
  },
  {
    slug: 'training',
    title: 'Training',
    description: 'Tools that make every walk easier.',
    icon: 'GraduationCap'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    slug: 'tactical-heavy-duty-harness',
    title: 'Tactical Heavy-Duty Harness',
    description:
      'Reinforced military-grade nylon harness with two metal D-rings, padded chest plate, and MOLLE attachment points. Engineered for working dogs and high-pull breeds.',
    price: 5499,
    originalPrice: 7999,
    stockStatus: 'in-stock',
    images: [
      'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=1200',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1200',
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200'
    ],
    category: 'harnesses-leashes',
    rating: 4.8,
    reviewCount: 1284,
    spec: {
      material: '1000D military-grade nylon, steel D-rings',
      sizes: ['M', 'L', 'XL'],
      weightRange: '40 – 110 lb',
      weatherproof: true
    },
    aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000001.html',
    pairsWith: ['p6', 'p2']
  },
  {
    id: 'p2',
    slug: 'waterproof-led-collar',
    title: 'Waterproof LED Safety Collar',
    description:
      'USB-rechargeable LED collar with 3 lighting modes, 100% waterproof construction, and 12-hour battery life. Visible up to 1,000 ft for night walks and trail runs.',
    price: 2499,
    originalPrice: 3499,
    stockStatus: 'in-stock',
    images: [
      'https://images.unsplash.com/photo-1568572933382-74d440642117?w=1200',
      'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=1200'
    ],
    category: 'outdoor-gear',
    rating: 4.7,
    reviewCount: 942,
    spec: {
      material: 'Silicone over reinforced nylon webbing',
      sizes: ['S', 'M', 'L'],
      weightRange: '15 – 90 lb',
      weatherproof: true
    },
    aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000002.html',
    pairsWith: ['p1', 'p6']
  },
  {
    id: 'p3',
    slug: 'long-range-fetching-toy',
    title: 'Long-Range Fetching Launcher',
    description:
      'Spring-loaded launcher hurls our floating tennis-style ball up to 75 ft with one hand. Perfect for high-drive retrievers and beach days.',
    price: 1899,
    stockStatus: 'in-stock',
    images: [
      'https://images.unsplash.com/photo-1561406636-b80293969660?w=1200',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200'
    ],
    category: 'interactive-toys',
    rating: 4.6,
    reviewCount: 612,
    spec: {
      material: 'Glass-filled nylon launcher, natural rubber ball',
      sizes: ['Standard'],
      weightRange: 'All sizes',
      weatherproof: true
    },
    aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000003.html',
    pairsWith: ['p4']
  },
  {
    id: 'p4',
    slug: 'portable-dog-water-bottle',
    title: 'Portable Trail Water Bottle',
    description:
      'Leak-proof 19 oz bottle with one-handed flip-trough lid. Food-grade silicone, BPA-free, fits any backpack side-pocket.',
    price: 1599,
    originalPrice: 2199,
    stockStatus: 'in-stock',
    images: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200',
      'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=1200'
    ],
    category: 'outdoor-gear',
    rating: 4.9,
    reviewCount: 2104,
    spec: {
      material: 'BPA-free Tritan + food-grade silicone',
      sizes: ['19 oz', '27 oz'],
      weightRange: 'All sizes',
      weatherproof: true
    },
    aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000004.html',
    pairsWith: ['p5', 'p3']
  },
  {
    id: 'p5',
    slug: 'cooling-vest',
    title: 'Evaporative Cooling Vest',
    description:
      'Three-layer evaporative fabric stays cool for up to 6 hours. Just soak, wring, and zip — protects active dogs in summer heat.',
    price: 3299,
    originalPrice: 4499,
    stockStatus: 'low-stock',
    images: [
      'https://images.unsplash.com/photo-1530041686259-53ddc28d3713?w=1200',
      'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=1200'
    ],
    category: 'outdoor-gear',
    rating: 4.5,
    reviewCount: 388,
    spec: {
      material: 'PVA evaporative microfiber, ripstop shell',
      sizes: ['M', 'L', 'XL'],
      weightRange: '30 – 100 lb',
      weatherproof: false
    },
    aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000005.html',
    pairsWith: ['p4', 'p1']
  },
  {
    id: 'p6',
    slug: 'reinforced-hiking-leash',
    title: 'Reinforced Bungee Hiking Leash',
    description:
      '6-ft climbing-grade rope leash with shock-absorbing bungee, traffic handle, and locking carabiner. Tested to 3,000 lbs of break strength.',
    price: 3499,
    stockStatus: 'in-stock',
    images: [
      'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=1200',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=1200'
    ],
    category: 'harnesses-leashes',
    rating: 4.9,
    reviewCount: 1651,
    spec: {
      material: '10mm climbing rope, anodized aluminum carabiner',
      sizes: ['6 ft'],
      weightRange: '20 – 150 lb',
      weatherproof: true
    },
    aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000006.html',
    pairsWith: ['p1', 'p2']
  }
];

export function getProduct(id: string) {
  return PRODUCTS.find((p) => p.id === id || p.slug === id);
}

export function getProductsByCategory(category: string) {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getRelated(productId: string) {
  const p = getProduct(productId);
  if (!p) return [];
  return (p.pairsWith ?? [])
    .map((id) => getProduct(id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
}
