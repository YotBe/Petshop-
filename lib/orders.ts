import type { Order, OrderStatus, OrderTimelineEntry } from './types';

const WISHLIST_URL =
  'https://www.aliexpress.com/p/wish-manage/share.html?type=wish&wishGroupId=900000003473719&spreadId=2ED41EE421F70C6BB3CF25DEEA87D907262B0DC22F17CFAACEA24126B7CFD7A4';

// In-memory mock orders. Swap for Supabase / Vercel Postgres in production.
// NOTE: this resets on every serverless cold start — fine for an MVP where
// notifications are the focus; persistence is a separate batch.
export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_1001',
    createdAt: '2026-05-02T15:21:00Z',
    customer: {
      name: 'מאיה אלון',
      email: 'maya@example.co.il',
      phone: '+972501112233',
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
        aliexpressUrl: 'https://a.aliexpress.com/_c40psG39'
      }
    ],
    subtotal: 16775,
    shipping: 2499,
    total: 19274,
    status: 'received',
    timeline: [{ status: 'received', at: '2026-05-02T15:21:00Z' }]
  },
  {
    id: 'ord_1002',
    createdAt: '2026-05-03T09:48:00Z',
    customer: {
      name: 'דניאל פרץ',
      email: 'dan.peretz@example.co.il',
      phone: '+972527778899',
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
        aliexpressUrl: 'https://a.aliexpress.com/_c4TyCy8f'
      }
    ],
    subtotal: 7531,
    shipping: 2499,
    total: 10030,
    status: 'shipped',
    timeline: [
      { status: 'received', at: '2026-05-03T09:48:00Z' },
      { status: 'paid', at: '2026-05-03T09:50:00Z' },
      { status: 'preparing', at: '2026-05-03T11:00:00Z' },
      { status: 'shipped', at: '2026-05-03T16:30:00Z', note: 'נמסר לשליח' }
    ],
    trackingUrl: 'https://example-courier.co.il/track/AB123456IL',
    trackingCarrier: 'דואר ישראל'
  }
];

export function getOrder(id: string): Order | undefined {
  return MOCK_ORDERS.find((o) => o.id === id);
}

export function createOrder(
  data: Omit<Order, 'id' | 'createdAt' | 'status' | 'timeline'>
): Order {
  const now = new Date().toISOString();
  const order: Order = {
    ...data,
    id: `ord_${Date.now().toString(36)}`,
    createdAt: now,
    status: 'received',
    timeline: [{ status: 'received', at: now }]
  };
  MOCK_ORDERS.push(order);
  return order;
}

export function updateOrderStatus(
  id: string,
  status: OrderStatus,
  note?: string
): Order | undefined {
  const order = getOrder(id);
  if (!order) return undefined;
  const entry: OrderTimelineEntry = {
    status,
    at: new Date().toISOString(),
    ...(note ? { note } : {})
  };
  order.status = status;
  order.timeline.push(entry);
  return order;
}

export function setTracking(
  id: string,
  url: string,
  carrier?: string
): Order | undefined {
  const order = getOrder(id);
  if (!order) return undefined;
  order.trackingUrl = url;
  if (carrier) order.trackingCarrier = carrier;
  return order;
}
