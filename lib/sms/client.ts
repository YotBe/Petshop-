/**
 * Twilio SMS client (REST, no SDK).
 *
 * Required env (skip silently otherwise):
 *   TWILIO_ACCOUNT_SID
 *   TWILIO_AUTH_TOKEN
 *   TWILIO_FROM_PHONE  (E.164, e.g. +15551234567)
 *
 * To switch to the official `twilio` SDK later:
 *   import twilio from 'twilio';
 *   await twilio(sid, token).messages.create({ to, from, body });
 */

export type SmsMessage = {
  /** E.164 destination number, e.g. +972501234567 */
  to: string;
  body: string;
};

export type SmsResult =
  | { sent: true; id?: string }
  | { skipped: true; reason: string };

function normalizePhone(raw: string): string | null {
  const trimmed = raw.replace(/[\s\-()]/g, '');
  if (!trimmed) return null;
  // Already E.164
  if (trimmed.startsWith('+')) return trimmed;
  // Israeli mobile leading 0 (e.g. 0501234567) → +972501234567
  if (trimmed.startsWith('0')) return `+972${trimmed.slice(1)}`;
  // Bare digits — assume IL country code
  if (/^\d+$/.test(trimmed)) return `+${trimmed}`;
  return null;
}

export async function sendSms(msg: SmsMessage): Promise<SmsResult> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_PHONE;

  if (!sid || !token || !from) {
    return {
      skipped: true,
      reason: 'no provider (TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN / TWILIO_FROM_PHONE missing)'
    };
  }

  const to = normalizePhone(msg.to);
  if (!to) {
    return { skipped: true, reason: `unparseable phone "${msg.to}"` };
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const auth = Buffer.from(`${sid}:${token}`).toString('base64');
  const body = new URLSearchParams({ To: to, From: from, Body: msg.body });

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Twilio ${res.status} ${res.statusText}: ${detail}`);
  }

  const data = (await res.json().catch(() => null)) as { sid?: string } | null;
  return { sent: true, id: data?.sid };
}
