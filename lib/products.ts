import type { Product, CategoryMeta } from './types';

// Wishlist source: https://www.aliexpress.com/p/wish-manage/share.html?type=wish&wishGroupId=900000003473719
const WISHLIST_URL =
  'https://www.aliexpress.com/p/wish-manage/share.html?type=wish&wishGroupId=900000003473719&spreadId=2ED41EE421F70C6BB3CF25DEEA87D907262B0DC22F17CFAACEA24126B7CFD7A4';

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: 'harnesses-leashes',
    title: 'רתמות ורצועות',
    description: 'בטיחות ונוחות לכל היום.',
    icon: 'Shield'
  },
  {
    slug: 'outdoor-gear',
    title: 'ציוד חוץ',
    description: 'בנוי להרפתקה ולטיולים.',
    icon: 'Mountain'
  },
  {
    slug: 'interactive-toys',
    title: 'צעצועים אינטראקטיביים',
    description: 'לשרוף אנרגיה ולהעשרה.',
    icon: 'Gamepad2'
  },
  {
    slug: 'training',
    title: 'אילוף',
    description: 'כלים לתרגול יומיומי.',
    icon: 'GraduationCap'
  },
  {
    slug: 'beds-furniture',
    title: 'מיטות וריהוט',
    description: 'מיטות נוחות, ספות ומשטחי מנוחה.',
    icon: 'Bed'
  },
  {
    slug: 'feeding',
    title: 'האכלה והשתייה',
    description: 'בקבוקים, קערות ומכלי אחסון.',
    icon: 'UtensilsCrossed'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    slug: 'pet-car-seat-belt-harness',
    title: 'רתמת בטיחות לרכב — חגורת בטיחות מתכווננת לכלבים וחתולים',
    description:
      'חגורת בטיחות מתכווננת המתחברת לכל חגורת בטיחות סטנדרטית ברכב. שומרת על החיה במהלך הנסיעה ומונעת תזוזה פתאומית.',
    price: 620,
    originalPrice: 636,
    stockStatus: 'in-stock',
    images: ['/products/IMG_3790.jpeg'],
    category: 'harnesses-leashes',
    rating: 4.8,
    reviewCount: 5000,
    spec: {
      material: 'ניילון מחוזק עם אבזם מתכת',
      sizes: ['מתכוונן'],
      weightRange: 'לכל הגדלים',
      weatherproof: false
    },
    aliexpressUrl: WISHLIST_URL,
    pairsWith: ['p11', 'p7']
  },
  {
    id: 'p2',
    slug: 'training-ring-puller',
    title: 'טבעת אילוף וגרירה — צעצוע פולר עמיד',
    description:
      'טבעת EVA קלת משקל וצפה על המים, מצוינת לגרירה, אחזור ומשחק בחוץ. בנויה לעמוד בנשיכות חזקות.',
    price: 1339,
    stockStatus: 'in-stock',
    images: [
      'https://images.unsplash.com/photo-1561406636-b80293969660?w=1200',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200'
    ],
    category: 'interactive-toys',
    rating: 4.8,
    reviewCount: 441,
    spec: {
      material: 'קצף EVA קל וצף',
      sizes: ['קטן', 'גדול'],
      weightRange: 'לכל הגדלים',
      weatherproof: true
    },
    aliexpressUrl: WISHLIST_URL,
    pairsWith: ['p4', 'p11']
  },
  {
    id: 'p3',
    slug: 'pet-sofa-bed',
    title: 'ספת שינה מפנקת לכלבים — מיטה גדולה',
    description:
      'ספה רכה ונעימה לכלבים גדולים, עם דפנות מוגבהות לתחושת ביטחון. עיצוב נקי שמתאים לכל חלל בבית.',
    price: 4798,
    originalPrice: 15305,
    stockStatus: 'in-stock',
    images: ['/products/IMG_3775.jpeg'],
    category: 'beds-furniture',
    rating: 4.5,
    reviewCount: 1000,
    spec: {
      material: 'בד רך עם מילוי סיבים',
      sizes: ['M', 'L', 'XL'],
      weightRange: '15 – 45 ק״ג',
      weatherproof: false
    },
    aliexpressUrl: WISHLIST_URL,
    pairsWith: ['p9', 'p10']
  },
  {
    id: 'p4',
    slug: 'eva-dog-toy-pack',
    title: 'סט צעצועי EVA לכלב (4 חלקים) — פריזבי, כדור וחבל',
    description:
      'ערכת משחק הכוללת פריזבי EVA צף, שני כדורים וחבל גרירה. מושלם לאימון, לאחזור ולפעילות גופנית.',
    price: 1427,
    originalPrice: 3375,
    stockStatus: 'in-stock',
    images: ['/products/IMG_3786.jpeg'],
    category: 'interactive-toys',
    rating: 4.7,
    reviewCount: 850,
    spec: {
      material: 'קצף EVA, גומי טבעי וחבל כותנה',
      sizes: ['סטנדרטי'],
      weightRange: 'לכל הגדלים',
      weatherproof: true
    },
    aliexpressUrl: 'https://a.aliexpress.com/_c4TyCy8f',
    pairsWith: ['p2', 'p5']
  },
  {
    id: 'p5',
    slug: 'tennis-balls-12-pack',
    title: 'סט 12 כדורי טניס עם תיק רשת לאימון',
    description:
      'כדורי טניס איכותיים לאימון בעצימות גבוהה, מגיעים בתיק רשת נוח לנשיאה ולאחסון. מושלם לאחזור בפארק ובחוף.',
    price: 3627,
    originalPrice: 7716,
    stockStatus: 'in-stock',
    images: ['/products/IMG_3787.jpeg'],
    category: 'interactive-toys',
    rating: 4.6,
    reviewCount: 370,
    spec: {
      material: 'לבד ממוחזר, גומי טבעי',
      sizes: ['סטנדרטי 6.5 ס״מ'],
      weightRange: 'לכל הגדלים',
      weatherproof: true
    },
    aliexpressUrl: 'https://a.aliexpress.com/_c4F3OacB',
    pairsWith: ['p4', 'p2']
  },
  {
    id: 'p6',
    slug: 'collapsible-food-storage',
    title: 'מכל אחסון אוכל מתקפל — עד 15 ק״ג',
    description:
      'מכל מתקפל לאחסון אוכל יבש לכלבים ולחתולים, עם מכסה אטום ובסיס על גלגלים. שומר על האוכל טרי ומגן מפני לחות ומזיקים.',
    price: 6227,
    originalPrice: 18316,
    stockStatus: 'in-stock',
    images: ['/products/IMG_3788.jpeg'],
    category: 'feeding',
    rating: 4.6,
    reviewCount: 703,
    spec: {
      material: 'סיליקון בדרגת מזון + PP',
      sizes: ['13 ק״ג', '33 ק״ג'],
      weightRange: 'לכל הגדלים',
      weatherproof: false
    },
    aliexpressUrl: 'https://a.aliexpress.com/_c2urGXj1',
    pairsWith: ['p7']
  },
  {
    id: 'p7',
    slug: 'portable-water-bottle',
    title: 'בקבוק מים נייד לכלב — לטיולים בחוץ',
    description:
      'בקבוק שתייה נייד עם קערה משולבת ולחצן הזרמה לפעולה ביד אחת. ללא BPA, מתאים לטיולים, לריצות ולביקורי חוף.',
    price: 3052,
    originalPrice: 6359,
    stockStatus: 'in-stock',
    images: ['/products/IMG_3789.jpeg'],
    category: 'feeding',
    rating: 4.9,
    reviewCount: 2104,
    spec: {
      material: 'Tritan ללא BPA + סיליקון',
      sizes: ['350 מ״ל', '550 מ״ל'],
      weightRange: 'לכל הגדלים',
      weatherproof: true
    },
    aliexpressUrl: WISHLIST_URL,
    pairsWith: ['p6', 'p1']
  },
  {
    id: 'p8',
    slug: 'pinecone-slow-feeder',
    title: 'צעצוע אצטרובל — האכלה איטית ופאזל לכלבים',
    description:
      'צעצוע גומי בצורת אצטרובל למאכל איטי שממלאים בנשנושים. מאתגר את הכלב, מאט אכילה ומספק העשרה מנטלית.',
    price: 3069,
    originalPrice: 6394,
    stockStatus: 'in-stock',
    images: ['/products/IMG_3781.jpeg'],
    category: 'interactive-toys',
    rating: 4.7,
    reviewCount: 600,
    spec: {
      material: 'גומי טבעי ללא רעילים',
      sizes: ['קטן', 'בינוני'],
      weightRange: 'לכלבים קטנים ובינוניים',
      weatherproof: true
    },
    aliexpressUrl: 'https://a.aliexpress.com/_c3cxOPkb',
    pairsWith: ['p2', 'p5']
  },
  {
    id: 'p9',
    slug: 'elevated-dog-bed-all-season',
    title: 'מיטת כלב מורמת — לכל עונה, פנים וחוץ, עמידה למים',
    description:
      'מיטה מורמת עם משטח רשת אווירי ומסגרת מתכת חזקה. מתאימה לחצר, לטראסה ולשימוש בתוך הבית.',
    price: 11977,
    originalPrice: 27159,
    stockStatus: 'in-stock',
    images: ['/products/IMG_3784.jpeg'],
    category: 'beds-furniture',
    rating: 4.6,
    reviewCount: 320,
    spec: {
      material: 'מסגרת מתכת מצופה, משטח Textilene',
      sizes: ['M', 'L', 'XL'],
      weightRange: '15 – 60 ק״ג',
      weatherproof: true
    },
    aliexpressUrl: 'https://a.aliexpress.com/_c40psG39',
    pairsWith: ['p10', 'p3']
  },
  {
    id: 'p10',
    slug: 'cooling-elevated-bed',
    title: 'מיטת קירור מורמת לכלב — מאווררת',
    description:
      'מסגרת מתכת חזקה עם משטח רשת המאפשר זרימת אוויר ומונע התחממות. אידיאלית לימי קיץ ולמרפסות חמימות.',
    price: 5236,
    originalPrice: 10908,
    stockStatus: 'in-stock',
    images: [
      'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=1200',
      'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200'
    ],
    category: 'beds-furniture',
    rating: 4.5,
    reviewCount: 250,
    spec: {
      material: 'מתכת מצופה + משטח רשת מתח גבוה',
      sizes: ['S', 'M', 'L'],
      weightRange: '5 – 50 ק״ג',
      weatherproof: true
    },
    aliexpressUrl: WISHLIST_URL,
    pairsWith: ['p9', 'p3']
  },
  {
    id: 'p11',
    slug: 'training-disc',
    title: 'דיסק אילוף עמיד — פריזבי לאימון ולשעשוע',
    description:
      'דיסק רך וגמיש, ידידותי לשיני הכלב. אידיאלי לאימון אחזור ולמשחקי שתף בקו הים ובפארק.',
    price: 1456,
    originalPrice: 3033,
    stockStatus: 'in-stock',
    images: ['/products/IMG_3785.jpeg'],
    category: 'training',
    rating: 4.5,
    reviewCount: 124,
    spec: {
      material: 'פלסטיק גמיש ידידותי לפה',
      sizes: ['סטנדרטי 22 ס״מ'],
      weightRange: 'לכל הגדלים',
      weatherproof: true
    },
    aliexpressUrl: 'https://a.aliexpress.com/_c3KrqlVz',
    pairsWith: ['p2', 'p4']
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
