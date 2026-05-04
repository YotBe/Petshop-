import Link from 'next/link';
import { cookies } from 'next/headers';
import { Flag, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { listReviews, pendingCount } from '@/lib/reviews';
import { getProduct } from '@/lib/products';
import ReviewModerationList from './moderation-list';

export const dynamic = 'force-dynamic';

export default function AdminReviewsPage() {
  const expected = process.env.ADMIN_PASSWORD;
  const provided = cookies().get('admin_pw')?.value;
  const authed = !expected || provided === expected;

  if (!authed) {
    return (
      <div className="container max-w-md py-20 text-center">
        <ShieldAlert className="mx-auto h-12 w-12 text-amber-500" />
        <h1 className="mt-3 text-2xl font-bold">גישת ניהול</h1>
        <p className="mt-2 text-slate-600">
          הגדירו את עוגיית <code className="font-mono text-xs">admin_pw</code> עם הערך
          של <code className="font-mono text-xs">ADMIN_PASSWORD</code>.
        </p>
        <Button asChild className="mt-6" variant="outline">
          <Link href="/">חזרה לדף הבית</Link>
        </Button>
      </div>
    );
  }

  const { reviews } = listReviews({
    status: 'pending',
    sort: 'newest',
    page: 1,
    pageSize: 100
  });
  const flagged = reviews.filter((r) => r.isFlagged).length;

  const enriched = reviews.map((r) => {
    const product = getProduct(r.productId);
    return { review: r, productTitle: product?.title ?? r.productId };
  });

  return (
    <div className="container py-10">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-ink">
            ניהול ביקורות
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            <span className="num font-semibold">{pendingCount()}</span> ביקורות
            ממתינות לאישור{flagged > 0 && (
              <>
                {' · '}
                <span className="inline-flex items-center gap-1 text-amber-700">
                  <Flag className="h-3.5 w-3.5" />
                  <span className="num">{flagged}</span> מסומנות אוטומטית
                </span>
              </>
            )}
          </p>
        </div>
        <Link
          href="/admin"
          className="text-sm font-medium text-brand hover:underline"
        >
          ← חזרה לניהול הזמנות
        </Link>
      </header>

      <div className="mt-8">
        {enriched.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-500">
            אין ביקורות הממתינות לאישור.
          </p>
        ) : (
          <ReviewModerationList items={enriched} />
        )}
      </div>
    </div>
  );
}
