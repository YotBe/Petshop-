import type { Product, CategoryMeta } from './types';

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: 'harnesses-leashes',
    title: 'רתמות ורצועות',
    description: 'בלי משיכות, בלי בריחות, נוחות לכל היום.',
    icon: 'Shield'
  },
  {
    slug: 'outdoor-gear',
    title: 'ציוד חוץ',
    description: 'בנוי לשביל, לאגם ולכל הרפתקה.',
    icon: 'Mountain'
  },
  {
    slug: 'interactive-toys',
    title: 'צעצועים אינטראקטיביים',
    description: 'לשרוף אנרגיה. לחסל שעמום.',
    icon: 'Gamepad2'
  },
  {
    slug: 'training',
    title: 'אילוף',
    description: 'כלים שעושים כל טיול לקל יותר.',
    icon: 'GraduationCap'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    slug: 'tactical-heavy-duty-harness',
    title: 'רתמה טקטית מחוזקת לעבודה',
    description:
      'רתמה מנילון בדרגה צבאית עם שתי טבעות D ממתכת, צלחת חזה מרופדת ונקודות חיבור MOLLE. מתוכננת לכלבי עבודה ולגזעים בעלי כוח משיכה גבוה.',
    price: 19999,
    originalPrice: 27999,
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
      material: 'נילון 1000D בדרגה צבאית, טבעות D מפלדה',
      sizes: ['M', 'L', 'XL'],
      weightRange: '18 – 50 ק״ג',
      weatherproof: true
    },
    aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000001.html',
    pairsWith: ['p6', 'p2']
  },
  {
    id: 'p2',
    slug: 'waterproof-led-collar',
    title: 'קולר LED בטיחות עמיד למים',
    description:
      'קולר LED נטען ב-USB עם 3 מצבי תאורה, עמידות מלאה למים ועד 12 שעות סוללה. נראה ממרחק של עד 300 מטר לטיולי לילה ולריצות שטח.',
    price: 8999,
    originalPrice: 12999,
    stockStatus: 'in-stock',
    images: [
      'https://images.unsplash.com/photo-1568572933382-74d440642117?w=1200',
      'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=1200'
    ],
    category: 'outdoor-gear',
    rating: 4.7,
    reviewCount: 942,
    spec: {
      material: 'סיליקון על גבי רצועת ניילון מחוזקת',
      sizes: ['S', 'M', 'L'],
      weightRange: '7 – 40 ק״ג',
      weatherproof: true
    },
    aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000002.html',
    pairsWith: ['p1', 'p6']
  },
  {
    id: 'p3',
    slug: 'long-range-fetching-toy',
    title: 'משגר כדור לטווח ארוך',
    description:
      'משגר עם קפיץ שזורק כדור טניס צף עד 23 מטרים ביד אחת. מושלם לכלבים אוהבי אחזור ולימים על שפת הים.',
    price: 6999,
    stockStatus: 'in-stock',
    images: [
      'https://images.unsplash.com/photo-1561406636-b80293969660?w=1200',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200'
    ],
    category: 'interactive-toys',
    rating: 4.6,
    reviewCount: 612,
    spec: {
      material: 'משגר מניילון משוריין, כדור גומי טבעי',
      sizes: ['סטנדרטי'],
      weightRange: 'לכל הגדלים',
      weatherproof: true
    },
    aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000003.html',
    pairsWith: ['p4']
  },
  {
    id: 'p4',
    slug: 'portable-dog-water-bottle',
    title: 'בקבוק מים נייד לשטח',
    description:
      'בקבוק 560 מ״ל אטום לדליפות עם מכסה זרבובית הפיכה לפעולה ביד אחת. סיליקון בדרגת מזון, ללא BPA, מתאים לכל תיק נשיאה.',
    price: 5999,
    originalPrice: 7999,
    stockStatus: 'in-stock',
    images: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200',
      'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=1200'
    ],
    category: 'outdoor-gear',
    rating: 4.9,
    reviewCount: 2104,
    spec: {
      material: 'Tritan ללא BPA + סיליקון בדרגת מזון',
      sizes: ['560 מ״ל', '800 מ״ל'],
      weightRange: 'לכל הגדלים',
      weatherproof: true
    },
    aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000004.html',
    pairsWith: ['p5', 'p3']
  },
  {
    id: 'p5',
    slug: 'cooling-vest',
    title: 'אפוד קירור התאדותי',
    description:
      'בד קירור תלת-שכבתי שנשאר קר עד 6 שעות. פשוט להרטיב, לסחוט ולסגור עם רוכסן — מגן על כלבים פעילים בחום הקיץ.',
    price: 11999,
    originalPrice: 16999,
    stockStatus: 'low-stock',
    images: [
      'https://images.unsplash.com/photo-1530041686259-53ddc28d3713?w=1200',
      'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=1200'
    ],
    category: 'outdoor-gear',
    rating: 4.5,
    reviewCount: 388,
    spec: {
      material: 'מיקרופייבר PVA מתאדה, מעטפת ריפסטופ',
      sizes: ['M', 'L', 'XL'],
      weightRange: '14 – 45 ק״ג',
      weatherproof: false
    },
    aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000005.html',
    pairsWith: ['p4', 'p1']
  },
  {
    id: 'p6',
    slug: 'reinforced-hiking-leash',
    title: 'רצועת טיולים מחוזקת עם בנג׳י',
    description:
      'רצועה באורך 1.8 מטר מחבל טיפוס איכותי, עם בנג׳י סופג זעזועים, ידית תנועה ואבזם נעילה. נבדקה לעמידות של 1,360 ק״ג.',
    price: 12999,
    stockStatus: 'in-stock',
    images: [
      'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=1200',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=1200'
    ],
    category: 'harnesses-leashes',
    rating: 4.9,
    reviewCount: 1651,
    spec: {
      material: 'חבל טיפוס 10 מ״מ, אבזם אלומיניום מאונדז',
      sizes: ['1.8 מטר'],
      weightRange: '9 – 68 ק״ג',
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
