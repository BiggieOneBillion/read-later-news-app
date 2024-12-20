import React, { useState } from "react";
import SignInDialog from "./auth";
import { v4 } from "uuid";
import { useGlobalContext } from "@/context/global-context";
import LogOutBtn from "./logout-btn";
import AccountBtn from "./account-btn";
import { useUserStore } from "@/store/user-store";
import { navLinkData } from "@/data/data";

const Navbar = () => {
  const { setNewsUrl, setNewsKey } = useGlobalContext();

  const isAllowed = useUserStore((state) => state.isAllowed);

  const [current, setCurrent] = useState(0);

  const handleFetchByCategory = (url, name, index) => {
    setCurrent(index);
    setNewsUrl(url);
    setNewsKey(name);
  };

  return (
    <nav className="flex-coly gap-2 md:flex-row flex justify-between items-center">
      <div className="flex-coly gap-3 md:gap-10 md:flex-row flex justify-start  items-center">
        <h2 className="text-xs sm:text-sm font-semibold text-slate-700 uppercase">
          Categories
        </h2>
        <menu className="flex items-start md:items-center justify-start gap-1">
          {navLinkData.map((el, i) => (
            <button
              key={v4()}
              onClick={() => handleFetchByCategory(el.url, el.name, i)}
              className={`inline-block py-1 px-3 rounded-md border border-slate-500 ${
                current === i
                  ? "bg-slate-800 text-white"
                  : "text-slate-600 bg-transparent"
              }  font-medium text-xs`}
            >
              {el.name}
            </button>
          ))}
        </menu>
      </div>
      <div className="flex items-center gap-4">
        {/* account sign-in and log-out btn */}
        {isAllowed ? <LogOutBtn /> : <SignInDialog />}
        {isAllowed && <AccountBtn />}
      </div>
    </nav>
  );
};

export default Navbar;
