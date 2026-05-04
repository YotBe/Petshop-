import { Star, BadgeCheck } from 'lucide-react';
import { getReviews } from '@/lib/reviews';

export default function Reviews({
  productId,
  rating,
  count
}: {
  productId: string;
  rating: number;
  count: number;
}) {
  const reviews = getReviews(productId);
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold">ביקורות לקוחות</h3>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={
                  i < Math.round(rating)
                    ? 'h-4 w-4 fill-amber-400 text-amber-400'
                    : 'h-4 w-4 text-slate-300'
                }
              />
            ))}
          </div>
          <span className="font-semibold">{rating.toFixed(1)}</span>
          <span className="text-slate-500">({count.toLocaleString('he-IL')})</span>
        </div>
      </div>

      <ul className="mt-5 grid gap-4 md:grid-cols-3">
        {reviews.map((r, i) => (
          <li key={i} className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand text-sm font-semibold">
                {r.author.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1 text-sm font-medium">
                  {r.author}
                  {r.verified && (
                    <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" aria-label="קנייה מאומתת" />
                  )}
                </div>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={
                        idx < r.rating ? 'h-3 w-3 fill-amber-400' : 'h-3 w-3 text-slate-300'
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-700 leading-relaxed">{r.body}</p>
            <p className="mt-2 text-xs text-slate-400">
              {new Date(r.date).toLocaleDateString('he-IL')}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
