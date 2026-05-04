import { NextResponse } from 'next/server';
import { MOCK_ORDERS } from '@/lib/orders';

export async function GET() {
  return NextResponse.json({ orders: MOCK_ORDERS });
}
