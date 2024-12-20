import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { useStore } from "zustand";

export const userStore = createStore(
  persist(
    (set) => ({
      isAllowed: false,
      userDetails: "",
      setIsAllowedTrue: () => set({ isAllowed: true }),
      setIsAllowedFalse: () => set({ isAllowed: false }),
      setDetails: (details) => set({ userDetails: details }),
    }),
    {
      name: "user-storage", // The key in localStorage (or chosen storage)
    }
  )
);

export const useUserStore = (selector) => useStore(userStore, selector);
