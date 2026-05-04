import type { Order, OrderStatus } from '@/lib/types';
import { formatILS } from '@/lib/utils';

const STATUS_TITLE: Record<OrderStatus, string> = {
  received: 'קיבלנו את ההזמנה שלך',
  paid: 'התשלום אושר',
  preparing: 'אנחנו מכינים את ההזמנה',
  shipped: 'ההזמנה יצאה לדרך',
  out_for_delivery: 'ההזמנה במשלוח אלייך',
  delivered: 'ההזמנה הגיעה',
  cancelled: 'ההזמנה בוטלה'
};

const STATUS_BODY: Record<OrderStatus, string> = {
  received:
    'קיבלנו את ההזמנה שלך! אנחנו מתחילים להכין אותה ונעדכן ברגע שתצא למשלוח.',
  paid: 'התשלום שלך עבר בהצלחה. עכשיו אנחנו מכינים את ההזמנה למשלוח.',
  preparing: 'ההזמנה שלך נארזת במחסן. בקרוב היא תצא לדרך.',
  shipped:
    'ההזמנה שלך יצאה לדרך! ההגעה הצפויה: 2–3 ימי עסקים. אם נשלח קישור מעקב — הוא בכפתור למטה.',
  out_for_delivery:
    'ההזמנה שלך במשלוח האחרון אלייך — תקבלו אותה היום. אם זמן ההגעה לא נוח, אפשר לתאם עם השליח.',
  delivered:
    'ההזמנה הגיעה! מקווים שאתם והכלב נהנים מהציוד החדש. נשמח לקבל ביקורת בדף המוצר.',
  cancelled:
    'ההזמנה בוטלה. החזר כספי יבוצע תוך 7 ימי עסקים לאמצעי התשלום המקורי.'
};

export function orderStatusSubject(status: OrderStatus, order: Order): string {
  return `${STATUS_TITLE[status]} · הזמנה ${order.id}`;
}

export function renderOrderStatusEmail(
  order: Order,
  status: OrderStatus
): string {
  const title = STATUS_TITLE[status];
  const body = STATUS_BODY[status];

  const lines = order.lines
    .map(
      (l) => `
        <tr>
          <td style="padding:8px 0;border-top:1px solid #e2e8f0;">${escapeHtml(l.title)}</td>
          <td style="padding:8px 0;border-top:1px solid #e2e8f0;text-align:center;white-space:nowrap;">×${l.quantity}</td>
          <td style="padding:8px 0;border-top:1px solid #e2e8f0;text-align:end;white-space:nowrap;direction:ltr;">${formatILS(l.price * l.quantity)}</td>
        </tr>`
    )
    .join('');

  const trackingButton = order.trackingUrl
    ? `<p style="margin:20px 0 0;">
         <a href="${order.trackingUrl}" style="display:inline-block;padding:12px 22px;background:#F97316;color:white;text-decoration:none;border-radius:8px;font-weight:bold;">
           למעקב אחר המשלוח${order.trackingCarrier ? ` — ${escapeHtml(order.trackingCarrier)}` : ''}
         </a>
       </p>`
    : '';

  return `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#FBF7F1;color:#0F172A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:white;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
          <tr>
            <td style="padding:24px;background:#0B5953;color:white;">
              <div style="font-size:13px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#F97316;">פטשופ</div>
              <div style="font-size:22px;font-weight:bold;margin-top:8px;line-height:1.3;">${escapeHtml(title)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <p style="margin:0 0 12px;font-size:15px;">שלום ${escapeHtml(order.customer.name)},</p>
              <p style="margin:0 0 18px;line-height:1.6;font-size:15px;">${escapeHtml(body)}</p>

              <div style="background:#FBF7F1;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin-bottom:18px;">
                <div style="font-size:12px;color:#64748b;">מספר הזמנה</div>
                <div style="font-size:18px;font-weight:bold;direction:ltr;text-align:end;">${escapeHtml(order.id)}</div>
              </div>

              ${trackingButton}

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;font-size:14px;">
                <thead>
                  <tr>
                    <th align="start" style="padding:8px 0;color:#64748b;font-weight:600;text-align:start;">פריט</th>
                    <th align="center" style="padding:8px 0;color:#64748b;font-weight:600;">כמות</th>
                    <th align="end" style="padding:8px 0;color:#64748b;font-weight:600;text-align:end;">סה״כ</th>
                  </tr>
                </thead>
                <tbody>${lines}
                  <tr>
                    <td colspan="2" style="padding:12px 0 0;border-top:2px solid #0F172A;font-weight:bold;">סה״כ הזמנה</td>
                    <td style="padding:12px 0 0;border-top:2px solid #0F172A;font-weight:bold;text-align:end;direction:ltr;">${formatILS(order.total)}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;background:#FBF7F1;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;line-height:1.6;">
              שאלות? <a href="https://wa.me/972558810183" style="color:#0F766E;text-decoration:none;">צרו קשר בוואטסאפ</a> · <a href="mailto:hello@petshop.co.il" style="color:#0F766E;text-decoration:none;">hello@petshop.co.il</a>
              <br />פטשופ — חנות ישראלית לציוד פרימיום לחיות מחמד.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
