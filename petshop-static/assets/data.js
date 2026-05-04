/* ========== Petshop static — shared data ========== */

window.PETSHOP = (function() {

  const CATEGORIES = [
    { slug: 'harnesses-leashes', title: 'רתמות ורצועות', desc: 'בטיחות ונוחות לכל היום', tagline: 'אחיזה בטוחה לכל טיול', tone: 'cream', img: 'products/IMG_3790.jpeg' },
    { slug: 'outdoor-gear',      title: 'ציוד חוץ',       desc: 'בנוי להרפתקה',          tagline: 'לטיולי שטח, חוף וקמפינג', tone: 'sage',  img: 'products/IMG_3789.jpeg' },
    { slug: 'interactive-toys',  title: 'צעצועים',         desc: 'משחק חכם להעשרה',       tagline: 'משחק חכם שמרגיע ומשעשע',  tone: 'sand',  img: 'products/IMG_3786.jpeg' },
    { slug: 'training',          title: 'אילוף',           desc: 'תרגול יומיומי',          tagline: 'כלים שעוזרים לכם להבין זה את זה', tone: 'cream', img: 'products/IMG_3785.jpeg' },
    { slug: 'beds-furniture',    title: 'מיטות',           desc: 'מנוחה רכה',              tagline: 'פינה רכה לנוח אחרי יום ארוך', tone: 'sage',  img: 'products/IMG_3775.jpeg' },
    { slug: 'feeding',           title: 'האכלה',           desc: 'בקבוקים, קערות, מכלים',  tagline: 'קערות, מיכלים ופתרונות חכמים', tone: 'sand',  img: 'products/IMG_3788.jpeg' }
  ];

  const PRODUCTS = [
    {
      id: 'p1', slug: 'pet-car-seat-belt-harness',
      title: 'רתמת בטיחות לרכב — חגורת בטיחות מתכווננת',
      desc: 'חגורת בטיחות מתכווננת המתחברת לכל חגורת בטיחות סטנדרטית ברכב. שומרת על החיה במהלך הנסיעה ומונעת תזוזה פתאומית.',
      price: 620, was: 636, rating: 4.8, reviews: 5000,
      img: 'products/IMG_3790.jpeg',
      images: ['products/IMG_3790.jpeg'],
      category: 'harnesses-leashes',
      tag: 'חובה',
      stock: 'in-stock',
      pairs: ['p11', 'p7'],
      spec: { material: 'ניילון מחוזק עם אבזם מתכת', sizes: ['מתכוונן'], weight: 'לכל הגדלים', weather: false }
    },
    {
      id: 'p2', slug: 'training-ring-puller',
      title: 'טבעת אילוף וגרירה — צעצוע פולר עמיד',
      desc: 'טבעת EVA קלת משקל וצפה על המים, מצוינת לגרירה, אחזור ומשחק בחוץ. בנויה לעמוד בנשיכות חזקות.',
      price: 1339, was: null, rating: 4.8, reviews: 441,
      img: 'products/IMG_3786.jpeg',
      images: ['products/IMG_3786.jpeg', 'products/IMG_3787.jpeg'],
      category: 'interactive-toys',
      tag: 'חדש',
      stock: 'in-stock',
      pairs: ['p4', 'p11'],
      spec: { material: 'קצף EVA קל וצף', sizes: ['קטן', 'גדול'], weight: 'לכל הגדלים', weather: true }
    },
    {
      id: 'p3', slug: 'pet-sofa-bed',
      title: 'ספת שינה מפנקת לכלבים — מיטה גדולה',
      desc: 'ספה רכה ונעימה לכלבים גדולים, עם דפנות מוגבהות לתחושת ביטחון. עיצוב נקי שמתאים לכל חלל בבית.',
      price: 4798, was: 15305, rating: 4.5, reviews: 1000,
      img: 'products/IMG_3775.jpeg',
      images: ['products/IMG_3775.jpeg'],
      category: 'beds-furniture',
      tag: 'בסטסלר',
      stock: 'in-stock',
      pairs: ['p9'],
      spec: { material: 'בד רך עם מילוי סיבים', sizes: ['M', 'L', 'XL'], weight: '15 – 45 ק״ג', weather: false }
    },
    {
      id: 'p4', slug: 'eva-dog-toy-pack',
      title: 'סט צעצועי EVA לכלב (4 חלקים)',
      desc: 'ערכת משחק הכוללת פריזבי EVA צף, שני כדורים וחבל גרירה. מושלם לאימון ולפעילות גופנית.',
      price: 1427, was: 3375, rating: 4.7, reviews: 850,
      img: 'products/IMG_3786.jpeg',
      images: ['products/IMG_3786.jpeg'],
      category: 'interactive-toys',
      stock: 'in-stock',
      pairs: ['p2', 'p5'],
      spec: { material: 'קצף EVA, גומי טבעי וחבל כותנה', sizes: ['סטנדרטי'], weight: 'לכל הגדלים', weather: true }
    },
    {
      id: 'p5', slug: 'tennis-balls-12-pack',
      title: 'סט 12 כדורי טניס עם תיק רשת',
      desc: 'כדורי טניס איכותיים לאימון בעצימות גבוהה, מגיעים בתיק רשת נוח לנשיאה ולאחסון.',
      price: 3627, was: 7716, rating: 4.6, reviews: 370,
      img: 'products/IMG_3787.jpeg',
      images: ['products/IMG_3787.jpeg'],
      category: 'interactive-toys',
      stock: 'in-stock',
      pairs: ['p4', 'p2'],
      spec: { material: 'לבד ממוחזר, גומי טבעי', sizes: ['סטנדרטי 6.5 ס״מ'], weight: 'לכל הגדלים', weather: true }
    },
    {
      id: 'p6', slug: 'collapsible-food-storage',
      title: 'מכל אחסון אוכל מתקפל — עד 15 ק״ג',
      desc: 'מכל מתקפל לאחסון אוכל יבש, עם מכסה אטום ובסיס על גלגלים. שומר על האוכל טרי ומגן מפני לחות.',
      price: 6227, was: 18316, rating: 4.6, reviews: 703,
      img: 'products/IMG_3788.jpeg',
      images: ['products/IMG_3788.jpeg'],
      category: 'feeding',
      tag: 'חוסך מקום',
      stock: 'in-stock',
      pairs: ['p7'],
      spec: { material: 'סיליקון בדרגת מזון + PP', sizes: ['13 ק״ג', '33 ק״ג'], weight: 'לכל הגדלים', weather: false }
    },
    {
      id: 'p7', slug: 'portable-water-bottle',
      title: 'בקבוק מים נייד לכלב — לטיולים בחוץ',
      desc: 'בקבוק שתייה נייד עם קערה משולבת ולחצן הזרמה לפעולה ביד אחת. ללא BPA, מתאים לטיולים ולחוף.',
      price: 3052, was: 6359, rating: 4.9, reviews: 2104,
      img: 'products/IMG_3789.jpeg',
      images: ['products/IMG_3789.jpeg'],
      category: 'feeding',
      tag: 'מומלץ',
      stock: 'in-stock',
      pairs: ['p6', 'p1'],
      spec: { material: 'Tritan ללא BPA + סיליקון', sizes: ['350 מ״ל', '550 מ״ל'], weight: 'לכל הגדלים', weather: true }
    },
    {
      id: 'p8', slug: 'pinecone-slow-feeder',
      title: 'צעצוע אצטרובל — האכלה איטית ופאזל',
      desc: 'צעצוע גומי בצורת אצטרובל למאכל איטי שממלאים בנשנושים. מאתגר את הכלב ומספק העשרה מנטלית.',
      price: 3069, was: 6394, rating: 4.7, reviews: 600,
      img: 'products/IMG_3781.jpeg',
      images: ['products/IMG_3781.jpeg'],
      category: 'interactive-toys',
      tag: 'מועדף',
      stock: 'in-stock',
      pairs: ['p2', 'p5'],
      spec: { material: 'גומי טבעי ללא רעילים', sizes: ['קטן', 'בינוני'], weight: 'לכלבים קטנים ובינוניים', weather: true }
    },
    {
      id: 'p9', slug: 'elevated-dog-bed-all-season',
      title: 'מיטת כלב מורמת — לכל עונה, פנים וחוץ',
      desc: 'מיטה מורמת עם משטח רשת אווירי ומסגרת מתכת חזקה. מתאימה לחצר, לטראסה ולשימוש בתוך הבית.',
      price: 11977, was: 27159, rating: 4.6, reviews: 320,
      img: 'products/IMG_3784.jpeg',
      images: ['products/IMG_3784.jpeg'],
      category: 'beds-furniture',
      tag: '−56%',
      stock: 'low-stock',
      pairs: ['p3'],
      spec: { material: 'מסגרת מתכת מצופה, משטח Textilene', sizes: ['M', 'L', 'XL'], weight: '15 – 60 ק״ג', weather: true }
    },
    {
      id: 'p11', slug: 'training-disc',
      title: 'דיסק אילוף עמיד — פריזבי לאימון',
      desc: 'דיסק רך וגמיש, ידידותי לשיני הכלב. אידיאלי לאימון אחזור ולמשחקי שתף בקו הים ובפארק.',
      price: 1456, was: 3033, rating: 4.5, reviews: 124,
      img: 'products/IMG_3785.jpeg',
      images: ['products/IMG_3785.jpeg'],
      category: 'training',
      tag: 'אימון',
      stock: 'in-stock',
      pairs: ['p2', 'p4'],
      spec: { material: 'פלסטיק גמיש ידידותי לפה', sizes: ['סטנדרטי 22 ס״מ'], weight: 'לכל הגדלים', weather: true }
    }
  ];

  const BUNDLES = [
    {
      id: 'b1', slug: 'puppy-starter',
      title: 'ערכת גור חדש',
      desc: 'כל מה שצריך לימים הראשונים בבית: רתמה בטוחה, שתייה לדרך, פאזל האכלה איטית וצעצוע EVA רך — חבילה אחת מסודרת.',
      img: 'products/IMG_3786.jpeg',
      items: ['p1','p7','p8','p4'],
      price: 6499, badge: 'חיסכון של ₪16'
    },
    {
      id: 'b2', slug: 'new-adopter',
      title: 'ערכת מאמצים',
      desc: 'התקנו את הבית לחבר חדש: מיטה רכה, רתמת בטיחות לרכב, בקבוק שתייה ופריזבי אימונים — חבילה אחת בחיסכון.',
      img: 'products/IMG_3775.jpeg',
      items: ['p1','p3','p7','p11'],
      price: 7999, badge: 'חיסכון של ₪19'
    }
  ];

  const REVIEWS_WALL = [
    { quote: 'הזמנתי רתמת בטיחות לרכב לקיבי, גולדן 32 ק״ג. הגיעה תוך יומיים, מידה מושלמת לפי הטבלה, החגורה הרבה יותר רכה ממה שציפיתי.', author: 'דנה מ.', sub: 'תל אביב · אמא של קיבי', initial: 'ד', tone: 'cream' },
    { quote: 'קניתי קערה ומכל אחסון אוכל. האיכות מצוינת, האוכל נשאר טרי, וההזמנה הגיעה מהר ובאריזה מקצועית. שירות בעברית עם מענה אנושי כשצריך.', author: 'אורן ק.', sub: 'חיפה · אבא של ננה', initial: 'א', tone: 'sage' },
    { quote: 'רוקי בורדר קולי בן שנתיים — ענייני אנרגיה. סט הצעצועים והפריזבי ממש עזרו לי. הוא חוזר מהפארק עייף ומאושר וההמלצה הייתה בול.', author: 'רוני ב.', sub: 'מודיעין · אמא של רוקי', initial: 'ר', tone: 'sand' }
  ];

  const PRODUCT_REVIEWS = {
    p1: [
      { author: 'מיכל א.', verified: true, rating: 5, body: 'אסף קורע כל רתמה תוך חודש. את זאת הוא לובש כבר 8 חודשים — אחרי כ-200 שעות שטח, גשם וחול — בלי שריטה.', date: '2024-09-12' },
      { author: 'יואב ר.', verified: true, rating: 5, body: 'התקנה תוך דקה, החגורה רכה, הכלב נשאר רגוע ברכב. שווה כל שקל.', date: '2024-08-03' },
      { author: 'נטע ב.', verified: false, rating: 4, body: 'איכות מעולה, הייתי שמחה לעוד צבע — אבל זה פיצ׳ר לא חיוני.', date: '2024-07-21' }
    ]
  };

  function getById(id) { return PRODUCTS.find(p => p.id === id || p.slug === id); }
  function getCategoryProducts(slug) { return slug ? PRODUCTS.filter(p => p.category === slug) : PRODUCTS; }
  function getRelated(p) { return (p.pairs || []).map(getById).filter(Boolean); }

  function fmtPrice(agorot) {
    return Math.round(agorot / 100).toLocaleString('he-IL');
  }
  function discountPct(price, was) {
    if (!was || was <= price) return 0;
    return Math.round(100 - (price / was) * 100);
  }
  function bundleListPrice(b) {
    return b.items.reduce((s, id) => s + (getById(id)?.price || 0), 0);
  }

  return {
    CATEGORIES, PRODUCTS, BUNDLES, REVIEWS_WALL, PRODUCT_REVIEWS,
    getById, getCategoryProducts, getRelated,
    fmtPrice, discountPct, bundleListPrice
  };
})();
