import { MOCK_ORDERS } from './orders';
import type { Review, ReviewSort, ReviewStatus } from './types';

/**
 * In-memory mock review store. Resets on cold start — fine for an MVP.
 *
 * To wire to a real DB later (Supabase / Postgres), replace MOCK_REVIEWS
 * with table queries; the helper signatures stay the same so callers
 * (API routes, admin page, PDP) don't change.
 *
 * Schema (when persisted):
 *   reviews(
 *     id text primary key,
 *     product_id text not null,
 *     user_id text not null,
 *     author_name text not null,
 *     author_email text not null,
 *     rating int not null check (rating between 1 and 5),
 *     title text not null,
 *     content text not null,
 *     status text not null check (status in ('pending','approved','rejected')),
 *     is_flagged boolean not null default false,
 *     flag_reason text,
 *     is_verified_purchase boolean not null default false,
 *     helpful_count int not null default 0,
 *     pet_name text, pet_breed text, pet_weight text,
 *     created_at timestamptz not null default now()
 *   );
 *   create index reviews_product_status_idx on reviews(product_id, status, created_at desc);
 *   create index reviews_status_idx on reviews(status, created_at desc);
 */
export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rv_001',
    productId: 'p1',
    userId: 'maya@example.co.il',
    authorName: 'מאיה אלון',
    authorEmail: 'maya@example.co.il',
    rating: 5,
    title: 'מצוינת לרכב — לא זזה',
    content: 'התקנתי לאחר 5 דקות, הכלבה (לברדורית 28 ק״ג) מרגישה בנוח. כבר עברנו 3 נסיעות ארוכות בלי בעיה. החגורה לא מחליקה ולא לוחצת.',
    status: 'approved',
    isFlagged: false,
    isVerifiedPurchase: true,
    helpfulCount: 24,
    petName: 'לונה',
    petBreed: 'לברדור',
    petWeight: '28 ק״ג',
    createdAt: '2026-04-12T09:30:00Z'
  },
  {
    id: 'rv_002',
    productId: 'p1',
    userId: 'yossi@example.co.il',
    authorName: 'יוסי לוי',
    authorEmail: 'yossi@example.co.il',
    rating: 4,
    title: 'איכותית, חבל שאין במידות נוספות',
    content: 'איכות מעולה, ריפוד נחמד, אבל למידה בינונית הייתה קצת רחבה לכלבי. בסוף התרגלנו. מומלץ.',
    status: 'approved',
    isFlagged: false,
    isVerifiedPurchase: true,
    helpfulCount: 11,
    createdAt: '2026-03-28T14:10:00Z'
  },
  {
    id: 'rv_003',
    productId: 'p3',
    userId: 'shira@example.co.il',
    authorName: 'שירה ברק',
    authorEmail: 'shira@example.co.il',
    rating: 5,
    title: 'הכלב פשוט נדבק אליה',
    content: 'הזמנתי ספה לפינה במטבח. ענקית, רכה, וההובלה הייתה מהירה. הכלב נכנס וכבר לא יוצא.',
    status: 'approved',
    isFlagged: false,
    isVerifiedPurchase: true,
    helpfulCount: 18,
    createdAt: '2026-04-02T18:45:00Z'
  },
  {
    id: 'rv_004',
    productId: 'p7',
    userId: 'avi@example.co.il',
    authorName: 'אבי גולדשמיט',
    authorEmail: 'avi@example.co.il',
    rating: 5,
    title: 'בקבוק חיוני לכל טיול',
    content: 'מאז שקניתי, לא יוצא בלי. נוח לשימוש ביד אחת, לא נשפך, נכנס לתיק טיולים. שווה בדיוק את המחיר.',
    status: 'approved',
    isFlagged: false,
    isVerifiedPurchase: false,
    helpfulCount: 32,
    petName: 'דייגו',
    petBreed: 'הזרון',
    createdAt: '2026-03-15T11:20:00Z'
  },
  {
    id: 'rv_005',
    productId: 'p4',
    userId: 'michal@example.co.il',
    authorName: 'מיכל אזולאי',
    authorEmail: 'michal@example.co.il',
    rating: 5,
    title: 'הסט הכי שווה שקניתי',
    content: 'ארבעה צעצועים, כולם עומדים בנשיכות. הפריזבי במיוחד הציל לי שעות בפארק.',
    status: 'approved',
    isFlagged: false,
    isVerifiedPurchase: true,
    helpfulCount: 7,
    createdAt: '2026-04-19T08:00:00Z'
  },
  {
    id: 'rv_006',
    productId: 'p1',
    userId: 'pending@example.co.il',
    authorName: 'מבקר חדש',
    authorEmail: 'pending@example.co.il',
    rating: 5,
    title: 'מעולה',
    content: 'מוצר טוב.',
    status: 'pending',
    isFlagged: true,
    flagReason: 'תוכן קצר מדי',
    isVerifiedPurchase: false,
    helpfulCount: 0,
    createdAt: '2026-05-04T07:00:00Z'
  }
];

const PROFANITY = ['shit', 'fuck', 'damn', 'מטומטם', 'דפוק'];
const PHONE_RE = /\d{8,}/;
const URL_RE = /https?:\/\/|www\./i;

function autoFlag(content: string): { flagged: boolean; reason?: string } {
  const lower = content.toLowerCase();
  if (content.trim().length < 12) return { flagged: true, reason: 'תוכן קצר מדי' };
  if (PROFANITY.some((w) => lower.includes(w.toLowerCase()))) {
    return { flagged: true, reason: 'תוכן בלתי הולם' };
  }
  if (PHONE_RE.test(content) || URL_RE.test(content)) {
    return { flagged: true, reason: 'מכיל קישור או טלפון' };
  }
  return { flagged: false };
}

function isVerifiedFor(productId: string, email: string): boolean {
  const e = email.toLowerCase().trim();
  if (!e) return false;
  return MOCK_ORDERS.some(
    (o) =>
      o.customer.email.toLowerCase().trim() === e &&
      o.lines.some((l) => l.productId === productId)
  );
}

export interface ListReviewsOpts {
  productId?: string;
  status?: ReviewStatus | 'all';
  sort?: ReviewSort;
  page?: number;
  pageSize?: number;
}

export interface ListReviewsResult {
  reviews: Review[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function listReviews({
  productId,
  status = 'approved',
  sort = 'helpful',
  page = 1,
  pageSize = 5
}: ListReviewsOpts = {}): ListReviewsResult {
  let list = MOCK_REVIEWS.slice();
  if (productId) list = list.filter((r) => r.productId === productId);
  if (status !== 'all') list = list.filter((r) => r.status === status);

  list.sort((a, b) => {
    if (sort === 'newest') return b.createdAt.localeCompare(a.createdAt);
    if (sort === 'highest') {
      const byRating = b.rating - a.rating;
      return byRating !== 0 ? byRating : b.createdAt.localeCompare(a.createdAt);
    }
    // helpful
    const byHelpful = b.helpfulCount - a.helpfulCount;
    return byHelpful !== 0 ? byHelpful : b.createdAt.localeCompare(a.createdAt);
  });

  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;
  const pageItems = list.slice(start, start + pageSize);
  return { reviews: pageItems, total, page: safePage, pageSize, totalPages };
}

export function reviewStats(productId: string): {
  count: number;
  average: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
} {
  const list = MOCK_REVIEWS.filter(
    (r) => r.productId === productId && r.status === 'approved'
  );
  const distribution: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };
  list.forEach((r) => distribution[r.rating]++);
  const sum = list.reduce((s, r) => s + r.rating, 0);
  return {
    count: list.length,
    average: list.length ? sum / list.length : 0,
    distribution
  };
}

export interface SubmitReviewInput {
  productId: string;
  userId: string;
  authorName: string;
  authorEmail: string;
  rating: number;
  title: string;
  content: string;
  petName?: string;
  petBreed?: string;
  petWeight?: string;
}

export function submitReview(input: SubmitReviewInput): Review {
  const r = Math.round(input.rating);
  if (!Number.isFinite(r) || r < 1 || r > 5) {
    throw new Error('דירוג חייב להיות בין 1 ל-5');
  }
  if (!input.title.trim()) throw new Error('חסרה כותרת');
  if (input.content.trim().length === 0) throw new Error('חסר תוכן');
  if (input.content.length > 500) throw new Error('תוכן עד 500 תווים');

  const flag = autoFlag(input.content);
  const review: Review = {
    id: `rv_${Date.now().toString(36)}`,
    productId: input.productId,
    userId: input.userId,
    authorName: input.authorName,
    authorEmail: input.authorEmail,
    rating: r as 1 | 2 | 3 | 4 | 5,
    title: input.title.trim().slice(0, 120),
    content: input.content.trim().slice(0, 500),
    status: 'pending',
    isFlagged: flag.flagged,
    flagReason: flag.reason,
    isVerifiedPurchase: isVerifiedFor(input.productId, input.authorEmail),
    helpfulCount: 0,
    petName: input.petName?.trim() || undefined,
    petBreed: input.petBreed?.trim() || undefined,
    petWeight: input.petWeight?.trim() || undefined,
    createdAt: new Date().toISOString()
  };
  MOCK_REVIEWS.push(review);
  return review;
}

export function moderateReview(
  id: string,
  decision: 'approve' | 'reject'
): Review | undefined {
  const r = MOCK_REVIEWS.find((x) => x.id === id);
  if (!r) return undefined;
  r.status = decision === 'approve' ? 'approved' : 'rejected';
  if (decision === 'approve') {
    r.isFlagged = false;
    r.flagReason = undefined;
  }
  return r;
}

export function pendingCount(): number {
  return MOCK_REVIEWS.filter((r) => r.status === 'pending').length;
}
