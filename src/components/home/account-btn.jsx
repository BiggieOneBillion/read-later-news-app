import React from "react";
import  Link  from "next/link";
import { RiDashboardFill } from "react-icons/ri";

const AccountBtn = () => {
  return (
    <Link
      href={"/user/dashboard"}
      className="text-base bg-slate-800 text-white font-medium flex justify-start items-center gap-1 border  hover:scale-[0.97] transition-transform duration-300 px-2 py-1"
    >
      <span className="text-sm">Your News</span>
      <span>
        <RiDashboardFill />
      </span>
    </Link>
  );
};

export default AccountBtn;
