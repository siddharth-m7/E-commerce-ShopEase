// src/store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../utils/api";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      login: async (email, password) => {
        try {
          set({ loading: true, error: null });
          const res = await api.post("/auth/login", { email, password });
          set({ user: res.data.user, loading: false });
        } catch (err) {
          set({ error: err.response?.data?.error || "Login failed", loading: false });
        }
      },

      register: async (name, email, password, role) => {
        try {
          set({ loading: true, error: null });
          const res = await api.post("/auth/register", { name, email, password, role });
          set({ user: res.data.user, loading: false });
        } catch (err) {
          set({ error: err.response?.data?.error || "Register failed", loading: false });
        }
      },

      logout: async () => {
        try {
          await api.post("/auth/logout");
        } catch (err) {
          console.error("Logout failed", err);
        }
        set({ user: null });
      },

      fetchProfile: async () => {
        try {
          const res = await api.get("/auth/profile");
          set({ user: res.data.user });
        } catch {
          set({ user: null });
        }
      },
    }),
    {
      name: "auth-storage", // key in localStorage
    }
  )
);
