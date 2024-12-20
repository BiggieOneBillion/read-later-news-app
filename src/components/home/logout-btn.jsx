import React from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { userStore } from "@/store/user-store";

const LogOutBtn = () => {
  const handleLogOut = () => {
    userStore.persist.clearStorage();
    window.location.reload();
  };
  return (
    <button
      onClick={handleLogOut}
      className="text-base text-slate-800 font-medium flex justify-start items-center gap-1 border  hover:border-slate-500 transition-colors duration-300 px-2 py-1"
    >
      <span className="text-sm">Log Out</span>
      <span>
        <RiLogoutBoxRLine />
      </span>
    </button>
  );
};

export default LogOutBtn;
