import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { moderateReview } from '@/lib/reviews';

/**
 * Admin moderation endpoint. Gated by the same simple cookie used by
 * /admin (ADMIN_PASSWORD). When ADMIN_PASSWORD is unset, allow access
 * (mirrors the /admin page behavior in dev).
 */
function isAuthed() {
  const expected = process.env.ADMIN_PASSWORD;
  const provided = cookies().get('admin_pw')?.value;
  return !expected || provided === expected;
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'אין הרשאה' }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as {
    decision?: 'approve' | 'reject';
  } | null;

  if (!body?.decision || !['approve', 'reject'].includes(body.decision)) {
    return NextResponse.json(
      { error: "decision חייב להיות 'approve' או 'reject'" },
      { status: 400 }
    );
  }

  const review = moderateReview(params.id, body.decision);
  if (!review) {
    return NextResponse.json({ error: 'ביקורת לא נמצאה' }, { status: 404 });
  }
  return NextResponse.json({ review });
}
