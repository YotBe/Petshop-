import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { listReviews, submitReview, reviewStats } from '@/lib/reviews';
import type { ReviewSort } from '@/lib/types';

const ALLOWED_SORTS: ReviewSort[] = ['helpful', 'newest', 'highest'];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const productId = url.searchParams.get('productId') ?? undefined;
  const sort = url.searchParams.get('sort') as ReviewSort | null;
  const page = Number(url.searchParams.get('page') ?? '1');
  const pageSize = Number(url.searchParams.get('pageSize') ?? '5');

  const result = listReviews({
    productId,
    sort: sort && ALLOWED_SORTS.includes(sort) ? sort : 'helpful',
    page,
    pageSize
  });
  const stats = productId ? reviewStats(productId) : null;
  return NextResponse.json({ ...result, stats });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'יש להתחבר כדי לכתוב ביקורת' },
      { status: 401 }
    );
  }

  const body = (await req.json().catch(() => null)) as {
    productId?: string;
    rating?: number;
    title?: string;
    content?: string;
    petName?: string;
    petBreed?: string;
    petWeight?: string;
  } | null;

  if (!body?.productId || !body.rating || !body.title || !body.content) {
    return NextResponse.json(
      { error: 'חסרים שדות חובה (productId, rating, title, content)' },
      { status: 400 }
    );
  }

  try {
    const review = submitReview({
      productId: body.productId,
      userId: session.user.email,
      authorName: session.user.name ?? session.user.email,
      authorEmail: session.user.email,
      rating: body.rating,
      title: body.title,
      content: body.content,
      petName: body.petName,
      petBreed: body.petBreed,
      petWeight: body.petWeight
    });
    return NextResponse.json({ review }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message || 'שליחת הביקורת נכשלה' },
      { status: 400 }
    );
  }
}
