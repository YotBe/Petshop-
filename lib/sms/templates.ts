import type { Order, OrderStatus } from '@/lib/types';

/**
 * Per-status SMS body. Kept under ~160 chars where possible to fit a single
 * GSM-7 segment (Hebrew text uses UCS-2 which limits to 70 chars per segment;
 * we accept multi-segment SMS for richer Hebrew copy).
 */
export function orderStatusSms(order: Order, status: OrderStatus): string {
  switch (status) {
    case 'received':
      return `פטשופ: קיבלנו את הזמנה ${order.id}. נעדכן ברגע שתצא למשלוח.`;
    case 'paid':
      return `פטשופ: התשלום אושר להזמנה ${order.id}. מתחילים להכין!`;
    case 'preparing':
      return `פטשופ: הזמנה ${order.id} נארזת במחסן. בקרוב יוצאת לדרך.`;
    case 'shipped': {
      const tracking = order.trackingUrl ? ` מעקב: ${order.trackingUrl}` : '';
      return `פטשופ: הזמנה ${order.id} יצאה למשלוח. הגעה ב-2-3 ימי עסקים.${tracking}`;
    }
    case 'out_for_delivery':
      return `פטשופ: הזמנה ${order.id} במשלוח אחרון אלייך — מגיע היום.`;
    case 'delivered':
      return `פטשופ: הזמנה ${order.id} הגיעה. תהנו! משוב? wa.me/972558810183`;
    case 'cancelled':
      return `פטשופ: הזמנה ${order.id} בוטלה. החזר תוך 7 ימי עסקים.`;
  }
}
