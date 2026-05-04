import type { Order } from './types';

// In-memory mock orders. Swap for Supabase / Vercel Postgres in production.
export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_1001',
    createdAt: '2026-05-02T15:21:00Z',
    customer: {
      name: 'מאיה אלון',
      email: 'maya@example.co.il',
      address: 'רחוב הרצל 14',
      city: 'תל אביב',
      postalCode: '6701234',
      country: 'ישראל'
    },
    lines: [
      {
        productId: 'p1',
        title: 'רתמה טקטית מחוזקת לעבודה',
        quantity: 1,
        price: 19999,
        aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000001.html'
      },
      {
        productId: 'p6',
        title: 'רצועת טיולים מחוזקת עם בנג׳י',
        quantity: 1,
        price: 12999,
        aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000006.html'
      }
    ],
    subtotal: 32998,
    shipping: 0,
    total: 32998,
    status: 'pending'
  },
  {
    id: 'ord_1002',
    createdAt: '2026-05-03T09:48:00Z',
    customer: {
      name: 'דניאל פרץ',
      email: 'dan.peretz@example.co.il',
      address: 'שדרות בן גוריון 22',
      city: 'חיפה',
      postalCode: '3303456',
      country: 'ישראל'
    },
    lines: [
      {
        productId: 'p4',
        title: 'בקבוק מים נייד לשטח',
        quantity: 2,
        price: 5999,
        aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000004.html'
      },
      {
        productId: 'p5',
        title: 'אפוד קירור התאדותי',
        quantity: 1,
        price: 11999,
        aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000005.html'
      }
    ],
    subtotal: 23997,
    shipping: 0,
    total: 23997,
    status: 'pending'
  }
];
