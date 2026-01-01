import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { LuUser, LuLayoutDashboard, LuLogOut, LuChevronDown } from "react-icons/lu";
import { userStore, useUserStore } from "@/store/user-store";

const UserMenu = () => {
  const userDetails = useUserStore((state) => state.userDetails);
  const userInfo = useUserStore((state) => state.userInfo);

  console.log({userDetails, userInfo})
  
  const handleLogOut = () => {
    userStore.persist.clearStorage();
    window.location.reload();
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-white border border-slate-200 rounded-full hover:border-slate-800 hover:bg-slate-50 transition-all duration-300 shadow-sm active:scale-95 group outline-none"
        >
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform duration-300">
             <LuUser className="text-sm" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest hidden sm:inline">Account</span>
            <LuChevronDown className="text-slate-400 group-data-[state=open]:rotate-180 transition-transform duration-300" />
          </div>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-[100] min-w-[200px] bg-white rounded-2xl p-2 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 origin-top-right mt-2"
          align="end"
          sideOffset={5}
        >
          <div className="px-3 py-2 border-b border-slate-50 mb-1">
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Signed in as</p>
             <p className="text-xs font-bold text-slate-900 truncate">{userInfo ? `${userInfo?.firstname} ${userInfo?.lastname}` : "Session"}</p>
          </div>

          <DropdownMenu.Item asChild>
            <Link
              href="/user/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-slate-600 rounded-xl hover:bg-slate-50 hover:text-slate-900 outline-none transition-colors cursor-pointer"
            >
              <LuLayoutDashboard className="text-base" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-slate-50 my-1" />

          <DropdownMenu.Item
            onClick={handleLogOut}
            className="flex items-center gap-3 px-3 py-2.5 text-xs font-bold text-red-500 rounded-xl hover:bg-red-50 outline-none transition-colors cursor-pointer"
          >
            <LuLogOut className="text-base" />
            <span>Sign Out</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserMenu;
