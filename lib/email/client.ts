/**
 * Resend email client (REST, no SDK).
 *
 * Required env (skip silently otherwise):
 *   RESEND_API_KEY
 *   RESEND_FROM_EMAIL
 *
 * To switch to the official `resend` SDK later, replace the fetch call with
 *   import { Resend } from 'resend';
 *   await new Resend(apiKey).emails.send({ from, to, subject, html });
 */

export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  /** plain-text fallback; auto-derived from html if omitted */
  text?: string;
};

export type EmailResult =
  | { sent: true; id?: string }
  | { skipped: true; reason: string };

function htmlToText(html: string) {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function sendEmail(msg: EmailMessage): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    return {
      skipped: true,
      reason: 'no provider (RESEND_API_KEY / RESEND_FROM_EMAIL missing)'
    };
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      from,
      to: msg.to,
      subject: msg.subject,
      html: msg.html,
      text: msg.text ?? htmlToText(msg.html)
    })
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Resend ${res.status} ${res.statusText}: ${detail}`);
  }

  const data = (await res.json().catch(() => null)) as { id?: string } | null;
  return { sent: true, id: data?.id };
}
