import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SuccessPage({ searchParams }: { searchParams: { order?: string } }) {
  return (
    <div className="container py-20 max-w-lg text-center">
      <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
      <h1 className="mt-4 text-3xl font-bold">Thanks for your order!</h1>
      <p className="mt-2 text-slate-600">
        Order ID: <span className="font-mono font-semibold">{searchParams.order ?? 'pending'}</span>
      </p>
      <p className="mt-2 text-slate-600">
        We’ve emailed your confirmation. Your gear is being prepped for shipment.
      </p>
      <Button asChild className="mt-6">
        <Link href="/products">Keep shopping</Link>
      </Button>
    </div>
  );
}
