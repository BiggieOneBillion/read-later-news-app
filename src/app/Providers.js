"use client";

// import { ThemeProvider } from 'acme-theme';
// import { AuthProvider } from 'acme-auth';
import { GlobalContextProvider } from "@/context/global-context";

export function Providers({ children }) {
  return <GlobalContextProvider>{children}</GlobalContextProvider>;
}
