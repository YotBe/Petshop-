import type { Order } from './types';

// In-memory mock orders. Swap for Supabase / Vercel Postgres in production.
export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_1001',
    createdAt: '2026-05-02T15:21:00Z',
    customer: {
      name: 'Maya Alvarez',
      email: 'maya@example.com',
      address: '422 Pine Ridge Rd',
      city: 'Boulder',
      postalCode: '80302',
      country: 'US'
    },
    lines: [
      {
        productId: 'p1',
        title: 'Tactical Heavy-Duty Harness',
        quantity: 1,
        price: 5499,
        aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000001.html'
      },
      {
        productId: 'p6',
        title: 'Reinforced Bungee Hiking Leash',
        quantity: 1,
        price: 3499,
        aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000006.html'
      }
    ],
    subtotal: 8998,
    shipping: 0,
    total: 8998,
    status: 'pending'
  },
  {
    id: 'ord_1002',
    createdAt: '2026-05-03T09:48:00Z',
    customer: {
      name: 'Daniel Park',
      email: 'dan.park@example.com',
      address: '88 Cedar Ave',
      city: 'Portland',
      postalCode: '97201',
      country: 'US'
    },
    lines: [
      {
        productId: 'p4',
        title: 'Portable Trail Water Bottle',
        quantity: 2,
        price: 1599,
        aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000004.html'
      },
      {
        productId: 'p5',
        title: 'Evaporative Cooling Vest',
        quantity: 1,
        price: 3299,
        aliexpressUrl: 'https://www.aliexpress.com/item/1005006000000005.html'
      }
    ],
    subtotal: 6497,
    shipping: 0,
    total: 6497,
    status: 'pending'
  }
];
