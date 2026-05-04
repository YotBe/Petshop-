import { sendEmail, type EmailResult } from './email/client';
import { sendSms, type SmsResult } from './sms/client';
import {
  orderStatusSubject,
  renderOrderStatusEmail
} from './email/templates/order-status';
import {
  fulfillmentStatusSubject,
  renderFulfillmentStatusEmail
} from './email/templates/fulfillment-status';
import { fulfillmentStatusSms, orderStatusSms } from './sms/templates';
import type { FulfillmentStatus, Order, OrderStatus } from './types';

export type NotifyResult = {
  email: EmailResult;
  sms: SmsResult;
};

/**
 * Fire email + SMS for an order status transition.
 *
 * - Always best-effort: failures are caught, logged, and do NOT throw.
 *   Status changes must succeed even if the customer can't be reached.
 * - SMS is skipped when no phone is on file.
 * - Email/SMS providers are skipped (no-op) when their env vars are absent,
 *   so dev/CI builds work without secrets.
 */
export async function notifyOrderStatus(
  order: Order,
  status: OrderStatus
): Promise<NotifyResult> {
  const emailPromise: Promise<EmailResult> = (async () => {
    try {
      return await sendEmail({
        to: order.customer.email,
        subject: orderStatusSubject(status, order),
        html: renderOrderStatusEmail(order, status)
      });
    } catch (err) {
      console.error(`[notifications] email failed for ${order.id}:`, err);
      return { skipped: true, reason: `error: ${(err as Error).message}` };
    }
  })();

  const smsPromise: Promise<SmsResult> = (async () => {
    if (!order.customer.phone) {
      return { skipped: true, reason: 'no phone on file' };
    }
    try {
      return await sendSms({
        to: order.customer.phone,
        body: orderStatusSms(order, status)
      });
    } catch (err) {
      console.error(`[notifications] sms failed for ${order.id}:`, err);
      return { skipped: true, reason: `error: ${(err as Error).message}` };
    }
  })();

  const [email, sms] = await Promise.all([emailPromise, smsPromise]);

  // Surface a single line per channel so logs are easy to scan in Vercel.
  console.log(
    `[notifications] order=${order.id} status=${status}`,
    `email=${'sent' in email ? `sent(${email.id ?? '-'})` : `skip(${email.reason})`}`,
    `sms=${'sent' in sms ? `sent(${sms.id ?? '-'})` : `skip(${sms.reason})`}`
  );

  return { email, sms };
}

/**
 * Fire email + SMS for a fulfillment-status transition (hybrid supplier flow).
 *
 * Same best-effort guarantees as notifyOrderStatus: failures are caught,
 * logged, never thrown. SMS skipped without phone; providers no-op without env.
 */
export async function notifyFulfillmentStatus(
  order: Order,
  status: FulfillmentStatus
): Promise<NotifyResult> {
  const emailPromise: Promise<EmailResult> = (async () => {
    try {
      return await sendEmail({
        to: order.customer.email,
        subject: fulfillmentStatusSubject(status, order),
        html: renderFulfillmentStatusEmail(order, status)
      });
    } catch (err) {
      console.error(`[notifications] fulfillment email failed for ${order.id}:`, err);
      return { skipped: true, reason: `error: ${(err as Error).message}` };
    }
  })();

  const smsPromise: Promise<SmsResult> = (async () => {
    if (!order.customer.phone) {
      return { skipped: true, reason: 'no phone on file' };
    }
    try {
      return await sendSms({
        to: order.customer.phone,
        body: fulfillmentStatusSms(order, status)
      });
    } catch (err) {
      console.error(`[notifications] fulfillment sms failed for ${order.id}:`, err);
      return { skipped: true, reason: `error: ${(err as Error).message}` };
    }
  })();

  const [email, sms] = await Promise.all([emailPromise, smsPromise]);

  console.log(
    `[notifications] order=${order.id} fulfillment=${status}`,
    `email=${'sent' in email ? `sent(${email.id ?? '-'})` : `skip(${email.reason})`}`,
    `sms=${'sent' in sms ? `sent(${sms.id ?? '-'})` : `skip(${sms.reason})`}`
  );

  return { email, sms };
}
