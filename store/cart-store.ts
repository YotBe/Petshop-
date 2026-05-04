'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { allocateBundlePrices, bundleProducts } from '@/lib/bundles';
import type { Bundle, CartItem, Product } from '@/lib/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  add: (product: Product, quantity?: number) => void;
  addBundle: (bundle: Bundle) => void;
  remove: (productId: string, bundleId?: string) => void;
  removeBundle: (bundleId: string) => void;
  setQuantity: (productId: string, quantity: number, bundleId?: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  toggle: () => void;
  count: () => number;
  subtotal: () => number;
}

function lineKey(productId: string, bundleId?: string) {
  return `${productId}::${bundleId ?? ''}`;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      add: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === product.id && !i.bundleId
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing ? { ...i, quantity: i.quantity + quantity } : i
              ),
              isOpen: true
            };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                title: product.title,
                image: product.images[0],
                price: product.price,
                quantity
              }
            ],
            isOpen: true
          };
        }),

      addBundle: (bundle) =>
        set((state) => {
          const allocated = allocateBundlePrices(bundle);
          const products = bundleProducts(bundle);
          const newItems = [...state.items];

          products.forEach(({ product, quantity }) => {
            const price = allocated.get(product.id) ?? product.price;
            const idx = newItems.findIndex(
              (i) => i.productId === product.id && i.bundleId === bundle.id
            );
            if (idx >= 0) {
              newItems[idx] = {
                ...newItems[idx],
                quantity: newItems[idx].quantity + quantity
              };
            } else {
              newItems.push({
                productId: product.id,
                title: product.title,
                image: product.images[0],
                price,
                quantity,
                bundleId: bundle.id,
                bundleTitle: bundle.title
              });
            }
          });

          return { items: newItems, isOpen: true };
        }),

      remove: (productId, bundleId) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.bundleId === bundleId)
          )
        })),

      removeBundle: (bundleId) =>
        set((state) => ({
          items: state.items.filter((i) => i.bundleId !== bundleId)
        })),

      setQuantity: (productId, quantity, bundleId) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.productId === productId && i.bundleId === bundleId
                ? { ...i, quantity }
                : i
            )
            .filter((i) => i.quantity > 0)
        })),

      clear: () => set({ items: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((s) => ({ isOpen: !s.isOpen })),
      count: () => get().items.reduce((n, i) => n + i.quantity, 0),
      subtotal: () => get().items.reduce((n, i) => n + i.price * i.quantity, 0)
    }),
    {
      name: 'petshop-cart',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : (undefined as unknown as Storage)
      ),
      partialize: (s) => ({ items: s.items })
    }
  )
);

export { lineKey };
