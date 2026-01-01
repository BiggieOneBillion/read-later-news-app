import React, { useState } from "react";
import SignInDialog from "./auth";
import { v4 } from "uuid";
import { useGlobalContext } from "@/context/global-context";
import LogOutBtn from "./logout-btn";
import AccountBtn from "./account-btn";
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
    setSearchTerm(""); // Reset search on category change
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    // Use everything?q=... for general searches
    const searchUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      searchTerm
    )}&sortBy=relevancy&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`;

    setNewsUrl(searchUrl);
    setNewsKey(`search-${searchTerm}`);
    setCurrent(-1); // Deselect categories
  };

  return (
    <nav className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center py-4 border-b border-slate-200">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8 grow">
        <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest">
          Categories
        </h2>
        <menu className="flex flex-wrap items-center justify-start gap-2">
          {navLinkData.map((el, i) => (
            <button
              key={v4()}
              onClick={() => handleFetchByCategory(el.url, el.name, i)}
              className={`inline-block py-2 px-4 rounded-full border transition-all duration-300 ${
                current === i
                  ? "bg-slate-900 text-white border-slate-900 shadow-lg scale-105"
                  : "text-slate-600 bg-white border-slate-200 hover:border-slate-800 hover:text-slate-900"
              } font-bold text-[10px] uppercase tracking-wider`}
            >
              {el.name}
            </button>
          ))}
        </menu>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
        <form
          onSubmit={handleSearch}
          className="relative w-full sm:w-72 group"
        >
          <input
            type="text"
            placeholder="Search global news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all shadow-sm"
          />
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 text-lg transition-colors" />
          <button type="submit" className="hidden">Search</button>
        </form>

        <div className="flex items-center gap-4">
          {isAllowed ? <LogOutBtn /> : <SignInDialog />}
          {isAllowed && <AccountBtn />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
