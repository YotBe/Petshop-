import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container py-24 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="mt-3 text-slate-600">We couldn’t find that page.</p>
      <Button asChild className="mt-6">
        <Link href="/">Back to shop</Link>
      </Button>
    </div>
  );
}
