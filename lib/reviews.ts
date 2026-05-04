export interface Review {
  author: string;
  rating: number;
  date: string;
  body: string;
  verified: boolean;
}

const REVIEW_POOL: Review[] = [
  { author: 'דנה כהן', rating: 5, date: '2026-04-12', body: 'איכות מצוינת! הכלב שלי מתלהב כל פעם שהוא רואה את זה.', verified: true },
  { author: 'יוסי לוי', rating: 5, date: '2026-03-28', body: 'הגיע מהר, אריזה טובה. שווה כל שקל.', verified: true },
  { author: 'שיר ברק', rating: 4, date: '2026-04-02', body: 'מוצר מעולה. הכלבה שלנו פשוט נדבקה אליו.', verified: true },
  { author: 'אבי גולדשמיט', rating: 5, date: '2026-03-15', body: 'ציפיתי לפחות אבל הופתעתי לטובה. חזק ועמיד.', verified: true },
  { author: 'מיכל אזולאי', rating: 5, date: '2026-04-19', body: 'עיצוב יפה, חומר חזק. ממליצ בחום!', verified: false },
  { author: 'רן שפירא', rating: 4, date: '2026-04-05', body: 'השירות מעולה. המוצר עצמו עוד יותר טוב.', verified: true },
  { author: 'ליאת מזרחי', rating: 5, date: '2026-03-22', body: 'אני קונה כאן בקביעות. תמיד איכותי ותמיד מהיר.', verified: true },
  { author: 'אורן דוד', rating: 5, date: '2026-04-10', body: 'מתאים בדיוק לכלב שלנו. נראה ממש מקצועי.', verified: false },
  { author: 'שני אלקיים', rating: 5, date: '2026-04-25', body: 'בדיוק מה שחיפשתי. תודה רבה!', verified: true },
  { author: 'תומר עמית', rating: 4, date: '2026-03-30', body: 'המחיר מצוין יחסית לאיכות. מאוד מרוצה.', verified: true },
  { author: 'נועה רביב', rating: 5, date: '2026-04-15', body: 'השתמשתי שבועיים ולא נשבר. עומד בעומס.', verified: true },
  { author: 'אסי חן', rating: 5, date: '2026-04-20', body: 'ההזמנה הגיעה תוך כמה ימים. ארוז יפה. תכף קונה עוד.', verified: false }
];

/** Deterministic 3-review sample per product so SSR is stable. */
export function getReviews(productId: string): Review[] {
  const seed = parseInt(productId.replace(/\D/g, ''), 10) || 0;
  const len = REVIEW_POOL.length;
  return [
    REVIEW_POOL[seed % len],
    REVIEW_POOL[(seed + 4) % len],
    REVIEW_POOL[(seed + 7) % len]
  ];
}
