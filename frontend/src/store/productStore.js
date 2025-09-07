// src/store/productStore.js

import { create } from "zustand";
import api from "../utils/api";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  success: null,

  fetchProducts: async (filters = {}) => {
    try {
      set({ loading: true, error: null, success: null });
      let url = "/products/filter";
      const params = [];
      if (filters.category) params.push(`category=${encodeURIComponent(filters.category)}`);
      if (filters.minPrice) params.push(`minPrice=${encodeURIComponent(filters.minPrice)}`);
      if (filters.maxPrice) params.push(`maxPrice=${encodeURIComponent(filters.maxPrice)}`);
      if (params.length > 0) url += `?${params.join("&")}`;
      const res = await api.get(url);
      set({ products: res.data.products, loading: false });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to load products", loading: false });
    }
  },

  createProduct: async (data) => {
    try {
      set({ error: null, success: null });
      const res = await api.post("/products", data);
      await get().fetchProducts();
      set({ success: "Product created successfully!" });
      return res.data.product;
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to create product" });
    }
  },

  updateProduct: async (id, data) => {
    try {
      set({ error: null, success: null });
      const res = await api.put(`/products/${id}`, data);
      await get().fetchProducts();
      set({ success: "Product updated successfully!" });
      return res.data.product;
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to update product" });
    }
  },

  deleteProduct: async (id) => {
    try {
      set({ error: null, success: null });
      const res = await api.delete(`/products/${id}`);
      await get().fetchProducts();
      set({ success: res.data.message || "Product deleted successfully!" });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to delete product" });
    }
  },
}));
