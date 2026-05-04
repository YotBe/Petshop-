'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { updateFulfillmentStatus } from '@/lib/orders';
import { notifyFulfillmentStatus } from '@/lib/notifications';
import type { FulfillmentStatus } from '@/lib/types';

function ensureAdmin() {
  const expected = process.env.ADMIN_PASSWORD;
  const provided = cookies().get('admin_pw')?.value;
  if (expected && provided !== expected) {
    throw new Error('Unauthorized');
  }
}

const VALID_FULFILLMENT_STATUSES: FulfillmentStatus[] = [
  'pending',
  'ordered_from_supplier',
  'arrived_at_base',
  'repackaged',
  'shipped_to_customer'
];

export async function transitionFulfillmentAction(formData: FormData) {
  ensureAdmin();

  const orderId = String(formData.get('orderId') ?? '');
  const status = String(formData.get('status') ?? '') as FulfillmentStatus;
  const note = String(formData.get('note') ?? '').trim() || undefined;
  const supplierTrackingNumber =
    String(formData.get('supplierTrackingNumber') ?? '').trim() || undefined;
  const finalTrackingNumber =
    String(formData.get('finalTrackingNumber') ?? '').trim() || undefined;
  const notes = String(formData.get('notes') ?? '').trim() || undefined;
  const notify = formData.get('notify') === 'on';

  if (!orderId) throw new Error('Missing orderId');
  if (!VALID_FULFILLMENT_STATUSES.includes(status)) {
    throw new Error(`Invalid fulfillment status: ${status}`);
  }

  const order = updateFulfillmentStatus(orderId, status, {
    note,
    supplierTrackingNumber,
    finalTrackingNumber,
    notes
  });

  if (order && notify) {
    // Best-effort; never throws.
    await notifyFulfillmentStatus(order, status);
  }

  revalidatePath('/admin');
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath(`/orders/${orderId}`);
}

export async function notifyFulfillmentAction(formData: FormData) {
  ensureAdmin();

  const orderId = String(formData.get('orderId') ?? '');
  const status = String(formData.get('status') ?? '') as FulfillmentStatus;
  if (!orderId) throw new Error('Missing orderId');
  if (!VALID_FULFILLMENT_STATUSES.includes(status)) {
    throw new Error(`Invalid fulfillment status: ${status}`);
  }

  const { getOrder } = await import('@/lib/orders');
  const order = getOrder(orderId);
  if (!order) return;

  await notifyFulfillmentStatus(order, status);
  revalidatePath('/admin');
}
