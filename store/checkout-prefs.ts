'use client';

import { create } from 'zustand';
import type { DeliveryMethod } from '@/lib/types';

interface CheckoutPrefsState {
  deliveryMethod: DeliveryMethod;
  setDeliveryMethod: (m: DeliveryMethod) => void;
}

/**
 * Lightweight, in-memory prefs shared between CheckoutForm and CheckoutSummary
 * so the summary can zero out shipping when "pickup" is selected. Not
 * persisted — selection should reset between sessions.
 */
export const useCheckoutPrefs = create<CheckoutPrefsState>()((set) => ({
  deliveryMethod: 'delivery',
  setDeliveryMethod: (deliveryMethod) => set({ deliveryMethod })
}));
