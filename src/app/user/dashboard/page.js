"use client";
import ProtectedRoute from "@/components/protected-route";
import Dashboard from "@/components/user-dashboard/dashboard";

export default function Home() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
