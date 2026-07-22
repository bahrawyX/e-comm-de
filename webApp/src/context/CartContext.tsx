/*
  CartContext.tsx
  ──────────────
  This file manages the shopping cart for the whole app using Zustand.

  KEY CONCEPTS:
  - Zustand → simple, fast state management with hooks
  - No provider needed → just import and use the hook anywhere
  - State and actions live together in one store
*/

import { create } from "zustand";
import type { Product, CartItem } from "../types";

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, newQty: number) => void;
  clearCart: () => void;
}

// Create a Zustand store with state + actions
export const useCart = create<CartState>((set) => ({
  // ── State ──
  items: [],

  // ── Actions ──
  // Add a product to the cart
  addItem: (product: Product) => {
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        // Already in cart → increase quantity by 1
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, qty: item.qty + 1 } : item
          ),
        };
      }

      // Not in cart yet → add it with qty = 1
      return { items: [...state.items, { ...product, qty: 1 }] };
    });
  },

  // Remove a product from the cart
  removeItem: (id: number) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  // Update the quantity of a product (minimum 1)
  updateQty: (id: number, newQty: number) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, newQty) } : item
      ),
    }));
  },

  // Empty the entire cart
  clearCart: () => {
    set({ items: [] });
  },
}));

// ── Computed value selectors ──
// Use these to get computed values that automatically update

// Total number of items (counting quantities)
export function useTotalItems(): number {
  return useCart((state) =>
    state.items.reduce((total, item) => total + item.qty, 0)
  );
}

// Total price
export function useTotalPrice(): number {
  return useCart((state) =>
    state.items.reduce((total, item) => total + item.price * item.qty, 0)
  );
}
