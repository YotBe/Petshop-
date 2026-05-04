import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SuccessPage({ searchParams }: { searchParams: { order?: string } }) {
  return (
    <div className="container py-20 max-w-lg text-center">
      <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
      <h1 className="mt-4 text-3xl font-bold">תודה על ההזמנה!</h1>
      <p className="mt-2 text-slate-600">
        מספר הזמנה: <span className="font-mono font-semibold">{searchParams.order ?? 'בהמתנה'}</span>
      </p>
      <p className="mt-2 text-slate-600">
        שלחנו אישור לאימייל. הציוד שלך מוכן למשלוח.
      </p>
      <Button asChild className="mt-6">
        <Link href="/products">המשך לקנות</Link>
      </Button>
    </div>
  );
}
