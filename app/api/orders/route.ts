import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { MOCK_ORDERS } from '@/lib/orders';

export async function GET() {
  const expected = process.env.ADMIN_PASSWORD;

  if (expected) {
    const provided = cookies().get('admin_pw')?.value;
    if (provided !== expected) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.json({ orders: MOCK_ORDERS });
}
