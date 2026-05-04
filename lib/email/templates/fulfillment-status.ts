import type { FulfillmentStatus, Order } from '@/lib/types';

const FULFILL_TITLE: Record<FulfillmentStatus, string> = {
  pending: 'קיבלנו את ההזמנה — מעבירים לעבודה',
  ordered_from_supplier: 'הזמנו את הציוד שלך מהספק',
  arrived_at_base:
    'הציוד שלך הגיע אלינו לבדיקה אישית בתל אביב',
  repackaged: 'ההזמנה שלך עברה בדיקה ונארזה במיתוג פטשופ',
  shipped_to_customer: 'ההזמנה שלך יצאה לדרך — מגיעה אלייך'
};

const FULFILL_BODY: Record<FulfillmentStatus, string> = {
  pending:
    'שלום! אנחנו עסק משפחתי קטן עם כלבים משלנו, ואנחנו לוקחים אישית כל הזמנה. כבר מתחילים לטפל בהזמנה שלך.',
  ordered_from_supplier:
    'הזמנו עבורך את הציוד מהספק שלנו. ברגע שהחבילה תגיע אלינו לתל אביב, נבדוק כל פריט במו ידינו ונארוז עבורך מחדש.',
  arrived_at_base:
    'בשורה טובה! הציוד שלך הגיע למשרד שלנו בתל אביב לבדיקה. אנחנו מוודאים שהכל מושלם — בלי קרעים, בלי חוסרים, בדיוק כמו שהיינו רוצים לקבל לכלב שלנו — לפני שאנחנו אורזים יפה ושולחים אלייך.',
  repackaged:
    'סיימנו את הבדיקה והאריזה האישית. ההזמנה שלך מוכנה לצאת לדרך ביום העסקים הקרוב.',
  shipped_to_customer:
    'ההזמנה שלך יצאה לדרך! ההגעה הצפויה: 1–3 ימי עסקים. מספר המעקב נמצא בכפתור למטה.'
};

export function fulfillmentStatusSubject(
  status: FulfillmentStatus,
  order: Order
): string {
  return `${FULFILL_TITLE[status]} · הזמנה ${order.id}`;
}

export function renderFulfillmentStatusEmail(
  order: Order,
  status: FulfillmentStatus
): string {
  const title = FULFILL_TITLE[status];
  const body = FULFILL_BODY[status];

  const trackingNumber =
    status === 'shipped_to_customer'
      ? order.finalTrackingNumber ?? null
      : null;
  const trackingUrl = order.trackingUrl;

  const trackingButton =
    trackingNumber && trackingUrl
      ? `<p style="margin:20px 0 0;">
           <a href="${escapeHtml(trackingUrl)}" style="display:inline-block;padding:12px 22px;background:#F97316;color:white;text-decoration:none;border-radius:8px;font-weight:bold;">
             מעקב משלוח · ${escapeHtml(trackingNumber)}
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
              <div style="font-size:13px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#F97316;">פטשופ · עסק משפחתי מתל אביב</div>
              <div style="font-size:22px;font-weight:bold;margin-top:8px;line-height:1.3;">${escapeHtml(title)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px;">
              <p style="margin:0 0 12px;font-size:15px;">שלום ${escapeHtml(order.customer.name)},</p>
              <p style="margin:0 0 18px;line-height:1.7;font-size:15px;">${escapeHtml(body)}</p>

              <div style="background:#FBF7F1;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin-bottom:18px;">
                <div style="font-size:12px;color:#64748b;">מספר הזמנה</div>
                <div style="font-size:18px;font-weight:bold;direction:ltr;text-align:end;">${escapeHtml(order.id)}</div>
              </div>

              ${trackingButton}

              <p style="margin:24px 0 0;line-height:1.7;font-size:13px;color:#64748b;">
                שאלות? אנחנו אנשים אמיתיים בצד השני —
                <a href="https://wa.me/972558810183" style="color:#0F766E;text-decoration:none;">צרו קשר בוואטסאפ</a>
                ונחזור אלייך בעברית.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 24px;background:#FBF7F1;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;line-height:1.6;">
              פטשופ — עסק משפחתי קטן מתל אביב. אנחנו בודקים כל פריט באופן אישי לפני שהוא יוצא אלייך, כי הציוד שאנחנו שולחים זה הציוד שאנחנו קונים לכלבים שלנו.
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
