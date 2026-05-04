'use client';

/**
 * Tiny analytics shim. Logs to console for now; swap the body of `track`
 * for Vercel Analytics, PostHog, GA4, or Segment when you pick a provider.
 *
 * Usage:
 *   track('checkout_started', { items: 3, total: 12000 });
 *   track('checkout_abandoned', { step: 'payment', reason: 'tab_close' });
 *   track('checkout_completed', { orderId, total });
 */
export type AnalyticsEvent =
  | 'checkout_started'
  | 'checkout_field_invalid'
  | 'checkout_submit_failed'
  | 'checkout_abandoned'
  | 'checkout_completed'
  | 'checkout_delivery_method'
  | 'newsletter_signup'
  | 'add_to_cart'
  | 'add_bundle';

type Props = Record<string, string | number | boolean | null | undefined>;

export function track(event: AnalyticsEvent, props: Props = {}) {
  if (typeof window === 'undefined') return;
  // TODO: wire real provider here.
  // eslint-disable-next-line no-console
  console.log(`[track] ${event}`, props);
}
