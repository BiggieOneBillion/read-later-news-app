import React, { useState } from "react";
import SignInDialog from "./auth";
import { v4 } from "uuid";
import { useGlobalContext } from "@/context/global-context";
import UserMenu from "./user-menu";
import { useUserStore } from "@/store/user-store";
import { navLinkData } from "@/data/data";
import { IoSearchOutline } from "react-icons/io5";

const Navbar = () => {
  const { setNewsUrl, setNewsKey } = useGlobalContext();
  const isAllowed = useUserStore((state) => state.isAllowed);
  const [current, setCurrent] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFetchByCategory = (url, name, index) => {
    setCurrent(index);
    setNewsUrl(url);
    setNewsKey(name);
    setSearchTerm("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    const searchUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      searchTerm
    )}&sortBy=relevancy&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;

    setNewsUrl(searchUrl);
    setNewsKey(`search-${searchTerm}`);
    setCurrent(-1);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 sm:px-8 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side: Brand and Categories */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8 grow">
          <div className="flex items-center justify-between">
             <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic">
               RT<span className="text-slate-500">News</span>
             </h1>
             {/* Mobile Auth/Account Actions */}
             <div className="flex lg:hidden items-center gap-3">
               {isAllowed ? <UserMenu /> : <SignInDialog />}
             </div>
          </div>

          <menu className="flex items-center justify-start gap-1 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
            {navLinkData.map((el, i) => (
              <button
                key={v4()}
                onClick={() => handleFetchByCategory(el.url, el.name, i)}
                className={`flex-shrink-0 py-2 px-4 rounded-full transition-all duration-300 font-bold text-[10px] uppercase tracking-wider ${
                  current === i
                    ? "bg-slate-900 text-white shadow-md scale-105"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {el.name}
              </button>
            ))}
          </menu>
        </div>

        {/* Right Side: Search and Desktop Auth */}
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <form
            onSubmit={handleSearch}
            className="relative flex-1 lg:w-64 group"
          >
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-100/50 border border-transparent rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:bg-white focus:border-slate-200 transition-all duration-300"
            />
            <IoSearchOutline className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 text-base" />
            <button type="submit" className="hidden">Search</button>
          </form>

          {/* Desktop Auth/Account Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {isAllowed ? <UserMenu /> : <SignInDialog />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
