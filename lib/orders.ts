import type { Order } from './types';

const WISHLIST_URL =
  'https://www.aliexpress.com/p/wish-manage/share.html?type=wish&wishGroupId=900000003473719&spreadId=2ED41EE421F70C6BB3CF25DEEA87D907262B0DC22F17CFAACEA24126B7CFD7A4';

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
        productId: 'p3',
        title: 'ספת שינה מפנקת לכלבים',
        quantity: 1,
        price: 4798,
        aliexpressUrl: WISHLIST_URL
      },
      {
        productId: 'p9',
        title: 'מיטת כלב מורמת — לכל עונה',
        quantity: 1,
        price: 11977,
        aliexpressUrl: WISHLIST_URL
      }
    ],
    subtotal: 16775,
    shipping: 2499,
    total: 19274,
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
        productId: 'p7',
        title: 'בקבוק מים נייד לכלב',
        quantity: 2,
        price: 3052,
        aliexpressUrl: WISHLIST_URL
      },
      {
        productId: 'p4',
        title: 'סט צעצועי EVA לכלב (4 חלקים)',
        quantity: 1,
        price: 1427,
        aliexpressUrl: WISHLIST_URL
      }
    ],
    subtotal: 7531,
    shipping: 2499,
    total: 10030,
    status: 'pending'
  }
];
