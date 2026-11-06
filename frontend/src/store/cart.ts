"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product, CartItem } from "@/types/product";
type Cart = {
  items: CartItem[];
  add: (p: Product) => void;
  setQuantity: (id: string, q: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  /** Replaces stored product snapshots with data verified by the server. */
  sync: (products: Product[]) => void;
};
export const useCart = create<Cart>()(
  persist(
    (set) => ({
      items: [],
      add: (p) =>
        set((s) => {
          if (!p.inStock || !p.purchasable || p.hasOptions) return s;
          if (
            s.items.some(
              (i) =>
                i.product.currency !== p.currency ||
                i.product.minorUnit !== p.minorUnit,
            )
          )
            return s;
          const found = s.items.find((i) => i.product.id === p.id);
          return {
            items: found
              ? s.items.map((i) =>
                  i.product.id === p.id
                    ? {
                        product: p,
                        quantity: Math.min(i.quantity + 1, p.maxQuantity),
                      }
                    : i,
                )
              : [...s.items, { product: p, quantity: 1 }],
          };
        }),
      setQuantity: (id, q) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.product.id === id
              ? {
                  ...i,
                  quantity: Math.min(
                    i.product.maxQuantity,
                    Math.max(1, Math.floor(q) || 1),
                  ),
                }
              : i,
          ),
        })),
      remove: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),
      clear: () => set({ items: [] }),
      sync: (products) =>
        set((s) => {
          let changed = false;
          const items = s.items.map((i) => {
            const fresh = products.find((p) => p.id === i.product.id);
            if (!fresh || JSON.stringify(fresh) === JSON.stringify(i.product))
              return i;
            changed = true;
            return {
              product: fresh,
              quantity: Math.min(i.quantity, fresh.maxQuantity),
            };
          });
          return changed ? { items } : s;
        }),
    }),
    {
      name: "tenis-cart-usd-v4",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
      skipHydration: true,
    },
  ),
);
