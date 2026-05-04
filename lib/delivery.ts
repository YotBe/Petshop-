import type { DeliveryMethod } from './types';

/**
 * Tel Aviv self-pickup point. We coordinate the exact time slot manually
 * via WhatsApp/email — no rigid hours system to maintain — so we expose
 * a generic window string and let the admin nail down the slot per order.
 */
export const PICKUP_LOCATION = {
  city: 'תל אביב',
  /** Override at deploy time once the storefront has a real pickup address. */
  address: 'תיאום מראש · אזור צפון תל אביב',
  /** Free-text window shown in checkout & tracking. */
  hours: 'ראשון–חמישי 10:00–18:00 · בתיאום מראש בוואטסאפ',
  /** International number (no leading +) used to build wa.me links. */
  whatsappNumber: '972558810183'
} as const;

export const DELIVERY_METHOD_LABEL: Record<DeliveryMethod, string> = {
  delivery: 'משלוח עד הבית',
  pickup: 'איסוף עצמי בתל אביב'
};

/** Build the wa.me link the merchant uses to coordinate pickup with a customer. */
export function pickupCoordinationUrl(orderId: string, customerName: string) {
  const message = `שלום ${customerName}, ההזמנה שלך (${orderId}) מוכנה לאיסוף בתל אביב. מתי נוח לך לקפוץ אלינו? 🐾`;
  return `https://wa.me/${PICKUP_LOCATION.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
