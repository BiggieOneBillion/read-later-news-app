import React from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user-store";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const handleChangeRoute = () => router.push("/");
  const isAllowed = useUserStore((state) => state.isAllowed);

  return isAllowed ? children : handleChangeRoute();
};

export default ProtectedRoute;
