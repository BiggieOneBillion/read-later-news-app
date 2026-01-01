import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";
import { useStore } from "zustand";




export const userStore = createStore(
  persist(
    (set) => ({
      isAllowed: false,
      userDetails: "", // user info comes from login - this is the user id
      userInfo: null, // user info come from login - this is the user {firstname, lastname}
      setIsAllowedTrue: () => set({ isAllowed: true }),
      setIsAllowedFalse: () => set({ isAllowed: false }),
      setDetails: (details) => set({ userDetails: details }),
      setUserInfo: (user) => set({ userInfo: user }), // user here is {firstname, lastname}
    }),
    {
      name: "user-storage", // The key in localStorage (or chosen storage)
    }
  )
);

export const useUserStore = (selector) => useStore(userStore, selector);
