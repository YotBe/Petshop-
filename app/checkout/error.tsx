'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CheckoutError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('[checkout] route error', error);
  }, [error]);

  return (
    <div className="container max-w-lg py-20 text-center">
      <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h1 className="mt-4 text-2xl font-bold text-ink">משהו השתבש בקופה</h1>
      <p className="mt-2 text-slate-600">
        ניסינו לטפל בהזמנה שלך אבל נתקלנו בתקלה. שום חיוב לא בוצע.
        נסו שוב, או פנו אלינו ונעזור.
      </p>
      {error.digest && (
        <p className="mt-3 font-mono text-xs text-slate-400">
          קוד שגיאה: {error.digest}
        </p>
      )}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button variant="accent" size="lg" onClick={reset}>
          <RefreshCw className="h-4 w-4" /> נסו שוב
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/contact">דברו איתנו</Link>
        </Button>
      </div>
    </div>
  );
}
