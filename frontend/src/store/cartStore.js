// src/store/cartStore.js
import { create } from "zustand";
import api from "../utils/api";

export const useCartStore = create((set, get) => ({
  cart: [],
  loading: false,
  error: null,

  fetchCart: async () => {
    try {
      set({ loading: true, error: null });
      const res = await api.get("/cart");
      // Support both { cart: [...] } and array response
      const cartArr = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.cart)
        ? res.data.cart
        : [];
      set({ cart: cartArr, loading: false });
    } catch (err) {
      console.error("Fetch cart error:", err);
      set({ error: "Failed to fetch cart", loading: false, cart: [] });
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      set({ error: null });
      const res = await api.post("/cart", { productId, quantity });
      const cartArr = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.cart)
        ? res.data.cart
        : [];
      set({ cart: cartArr });
    } catch (err) {
      console.error("Add to cart error:", err);
      set({ error: "Failed to add to cart" });
      // Refresh cart to ensure consistency
      await get().fetchCart();
    }
  },

  removeFromCart: async (productId) => {
    try {
      set({ error: null });
      const res = await api.delete(`/cart/${productId}`);
      const cartArr = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.cart)
        ? res.data.cart
        : [];
      set({ cart: cartArr });
    } catch (err) {
      console.error("Remove from cart error:", err);
      set({ error: "Failed to remove from cart" });
      // Refresh cart to ensure consistency
      await get().fetchCart();
    }
  },

  decreaseQuantity: async (productId) => {
    try {
      set({ error: null });
      const res = await api.patch(`/cart/${productId}`);
      const cartArr = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.cart)
        ? res.data.cart
        : [];
      set({ cart: cartArr });
    } catch (err) {
      console.error("Decrease quantity error:", err);
      set({ error: "Failed to decrease quantity" });
      // Refresh cart to ensure consistency
      await get().fetchCart();
    }
  },

  clearCart: async () => {
    try {
      set({ error: null });
      const res = await api.delete("/cart");
      const cartArr = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.cart)
        ? res.data.cart
        : [];
      set({ cart: cartArr });
    } catch (err) {
      console.error("Clear cart error:", err);
      set({ error: "Failed to clear cart" });
      // Refresh cart to ensure consistency
      await get().fetchCart();
    }
  },

  resetCart: () => {
    set({ cart: [], error: null, loading: false });
  },
}));
