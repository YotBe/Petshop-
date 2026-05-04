import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/client';

/**
 * Newsletter signup with static welcome coupon.
 *
 * MVP scope (DB-less):
 * - In-memory map dedupes by email so the same address gets the same code
 *   if they re-submit. Resets on cold start.
 * - Coupon code WELCOME10-XXXXXX is a marketing/email artifact only —
 *   it is NOT yet validated by /api/checkout. Wire that in a follow-up
 *   batch once the cart supports coupon codes.
 *
 * Persistence schema (when wired):
 *   newsletter_subscriptions(
 *     id text primary key,
 *     email text unique not null,
 *     coupon_code text unique not null,
 *     valid_until timestamptz not null,
 *     used_at timestamptz,
 *     unsubscribed_at timestamptz,
 *     created_at timestamptz not null default now()
 *   );
 */

const COUPON_TTL_DAYS = 30;
const subscriptions = new Map<
  string,
  { code: string; createdAt: number; validUntil: number }
>();

function generateCode(): string {
  // 6-char alphanum, omit visually ambiguous chars (0/O, 1/I/L)
  const alphabet = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 6; i++) {
    s += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `WELCOME10-${s}`;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function couponEmail(code: string, validUntilISO: string): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || 'https://petshop-two-ruby.vercel.app';
  const expires = new Date(validUntilISO).toLocaleDateString('he-IL');
  return `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#FBF7F1;color:#0F172A;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:white;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        <tr><td style="padding:28px 24px;background:#0B5953;color:white;text-align:center;">
          <div style="font-size:13px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:#F97316;">פטשופ</div>
          <div style="font-size:26px;font-weight:bold;margin-top:8px;">🎁 ‎10% הנחה על ההזמנה הראשונה שלך</div>
        </td></tr>
        <tr><td style="padding:28px 24px;text-align:center;">
          <p style="margin:0 0 12px;font-size:15px;">ברוכים הבאים למועדון פטשופ!</p>
          <p style="margin:0 0 22px;line-height:1.6;font-size:15px;">השתמשו בקוד הבא בקופה כדי לקבל ‎10% הנחה. תקף עד <strong>${expires}</strong>, להזמנה ראשונה ולמעל ‎₪100.</p>
          <div style="display:inline-block;padding:18px 28px;background:#FBF7F1;border:2px dashed #F97316;border-radius:10px;font-family:'SF Mono',Menlo,Consolas,monospace;font-size:24px;font-weight:bold;color:#0F172A;letter-spacing:2px;direction:ltr;">${code}</div>
          <p style="margin:22px 0 0;">
            <a href="${baseUrl}/products" style="display:inline-block;padding:12px 24px;background:#F97316;color:white;text-decoration:none;border-radius:8px;font-weight:bold;">התחילו לקנות</a>
          </p>
        </td></tr>
        <tr><td style="padding:14px 24px;background:#FBF7F1;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;line-height:1.6;">
          הקופון תקף ל-30 יום מההצטרפות. למינימום הזמנה ‎₪100. לא ניתן לשלב עם הטבות אחרות.<br />
          לא רוצים יותר מיילים? <a href="${baseUrl}/contact" style="color:#0F766E;">לחצו כאן</a>.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    email?: string;
    consent?: boolean;
  } | null;

  const email = body?.email?.trim().toLowerCase() ?? '';
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'אימייל לא תקין' }, { status: 400 });
  }
  if (!body?.consent) {
    return NextResponse.json(
      { error: 'יש לאשר קבלת מיילים' },
      { status: 400 }
    );
  }

  const existing = subscriptions.get(email);
  const now = Date.now();
  const ttl = COUPON_TTL_DAYS * 24 * 60 * 60 * 1000;
  const code = existing?.code ?? generateCode();
  const validUntil = existing?.validUntil ?? now + ttl;
  if (!existing) {
    subscriptions.set(email, { code, createdAt: now, validUntil });
  }
  const validUntilISO = new Date(validUntil).toISOString();

  // Best-effort send. No-ops cleanly without RESEND_API_KEY.
  const emailResult = await sendEmail({
    to: email,
    subject: '🎁 קוד 10% הנחה שלך — פטשופ',
    html: couponEmail(code, validUntilISO)
  }).catch((err) => {
    console.error('[newsletter] email send failed:', err);
    return { skipped: true, reason: 'send error' } as const;
  });

  return NextResponse.json({
    ok: true,
    code,
    validUntil: validUntilISO,
    alreadySubscribed: Boolean(existing),
    emailDelivery:
      'sent' in emailResult ? 'sent' : `skipped: ${emailResult.reason}`
  });
}
