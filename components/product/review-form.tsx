'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Star, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SignInButton from '@/components/auth/sign-in-button';

const MAX_CONTENT = 500;

export default function ReviewForm({
  productId,
  onSubmitted
}: {
  productId: string;
  onSubmitted?: () => void;
}) {
  const { data: session, status } = useSession();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [petName, setPetName] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (status === 'loading') {
    return <div className="h-32 animate-pulse rounded-xl bg-white/60" />;
  }

  if (!session?.user) {
    return (
      <div>
        <p className="text-sm text-slate-700">
          כדי לכתוב ביקורת יש להתחבר. אנחנו עושים את זה כדי לוודא שכל ביקורת
          מגיעה מאדם אמיתי.
        </p>
        <div className="mt-4">
          <SignInButton />
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    if (rating < 1 || rating > 5) {
      setError('אנא בחרו דירוג בין 1 ל-5 כוכבים');
      return;
    }
    if (!title.trim()) {
      setError('כותרת היא שדה חובה');
      return;
    }
    if (content.trim().length < 12) {
      setError('הביקורת קצרה מדי — לפחות 12 תווים');
      return;
    }
    if (content.length > MAX_CONTENT) {
      setError(`תוכן עד ${MAX_CONTENT} תווים`);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          productId,
          rating,
          title: title.trim(),
          content: content.trim(),
          petName: petName.trim() || undefined,
          petBreed: petBreed.trim() || undefined,
          petWeight: petWeight.trim() || undefined
        })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `שגיאה ${res.status}`);
      toast.success('הביקורת נשלחה!', {
        description: 'היא תפורסם לאחר אישור הצוות שלנו.'
      });
      setRating(0);
      setTitle('');
      setContent('');
      setPetName('');
      setPetBreed('');
      setPetWeight('');
      onSubmitted?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שליחה נכשלה');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <header>
        <h4 className="text-base font-bold text-ink">כתבו ביקורת</h4>
        <p className="text-xs text-slate-500">
          מחוברים כ-<span className="font-medium text-ink">{session.user.email}</span>.
          הביקורת תפורסם אחרי בדיקת תוכן קצרה.
        </p>
      </header>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-ink">דירוג</label>
        <div
          className="mt-2 flex items-center gap-1"
          onMouseLeave={() => setHovered(0)}
        >
          {[1, 2, 3, 4, 5].map((n) => {
            const active = (hovered || rating) >= n;
            return (
              <button
                key={n}
                type="button"
                aria-label={`${n} כוכבים`}
                aria-pressed={rating === n}
                onClick={() => setRating(n)}
                onMouseEnter={() => setHovered(n)}
                className="p-1 touch-manipulation"
              >
                <Star
                  className={
                    active
                      ? 'h-7 w-7 fill-amber-400 text-amber-400'
                      : 'h-7 w-7 text-slate-300'
                  }
                />
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="rv-title" className="text-sm font-medium text-ink">
          כותרת
        </label>
        <Input
          id="rv-title"
          required
          maxLength={120}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="למשל: בדיוק מה שחיפשנו לטיולים"
          className="mt-1.5"
        />
      </div>

      <div>
        <label htmlFor="rv-content" className="text-sm font-medium text-ink">
          הביקורת שלכם
        </label>
        <textarea
          id="rv-content"
          required
          rows={4}
          maxLength={MAX_CONTENT}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="ספרו על השימוש שלכם — איכות, התאמה, שירות"
          className="mt-1.5 flex w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        />
        <div className="mt-1 text-end text-xs text-slate-400">
          <span className="num">{content.length}</span> / <span className="num">{MAX_CONTENT}</span>
        </div>
      </div>

      <details className="rounded-md border border-slate-200 bg-white p-3">
        <summary className="cursor-pointer text-sm font-medium text-slate-700">
          הוספת פרטי החיה (אופציונלי)
        </summary>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div>
            <label htmlFor="rv-petname" className="text-xs font-medium text-slate-600">
              שם
            </label>
            <Input
              id="rv-petname"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="לונה"
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="rv-petbreed" className="text-xs font-medium text-slate-600">
              גזע
            </label>
            <Input
              id="rv-petbreed"
              value={petBreed}
              onChange={(e) => setPetBreed(e.target.value)}
              placeholder="לברדור"
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="rv-petweight" className="text-xs font-medium text-slate-600">
              משקל
            </label>
            <Input
              id="rv-petweight"
              value={petWeight}
              onChange={(e) => setPetWeight(e.target.value)}
              placeholder="28 ק״ג"
              className="mt-1"
            />
          </div>
        </div>
      </details>

      <Button
        type="submit"
        size="lg"
        variant="accent"
        disabled={submitting}
        className="w-full sm:w-auto"
      >
        {submitting ? 'שולח...' : 'שלחו ביקורת'}
      </Button>
    </form>
  );
}
