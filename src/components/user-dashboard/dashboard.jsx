import React, { useState, useEffect } from "react";
import GridLayout from "../home/grid-layout";
import NewsCard from "./news-card";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import  Link  from "next/link";
import { useUserStore } from "@/store/user-store";
import { IoSearchOutline, IoArrowBackOutline, IoTrashOutline } from "react-icons/io5";
import { LuLoader, LuInbox } from "react-icons/lu";

const ErrorComponent = ({ retry }) => (
  <div className="w-full flex flex-col items-center justify-center py-20 space-y-4">
    <div className="p-4 bg-red-50 rounded-full text-red-500">
      <LuLoader className="w-8 h-8 animate-spin" />
    </div>
    <div className="text-center">
      <h3 className="font-black text-slate-900 uppercase tracking-tighter">Connection Lost</h3>
      <p className="text-sm text-slate-500 max-w-[200px] mx-auto">Your digital feed is stuck. Let's try to reconnect.</p>
    </div>
    <button
      onClick={() => retry()}
      className="px-6 py-2 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-full active:scale-95 transition-all shadow-lg shadow-slate-900/10"
    >
      Retry Feed
    </button>
  </div>
);

const NodataComponent = ({ isSearch }) => {
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200">
        <LuInbox className="w-12 h-12" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">
          {isSearch ? "No matching news" : "Your library is empty"}
        </h3>
        <p className="text-sm font-medium text-slate-400 max-w-xs mx-auto leading-relaxed">
          {isSearch 
            ? "We couldn't find any saved articles matching that query. Try a different search." 
            : "You haven't saved any stories yet. Explore the latest news and build your collection."}
        </p>
      </div>
      {!isSearch && (
        <button
          onClick={() => router.replace("/")}
          className="px-8 py-3 bg-slate-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-full active:scale-95 transition-all shadow-xl shadow-slate-900/20"
        >
          Explore Now
        </button>
      )}
    </div>
  );
};

const LoadingComponent = () => (
  <div className="w-full flex items-center justify-center py-40">
    <div className="flex flex-col items-center gap-4">
      <LuLoader className="w-10 h-10 text-slate-900 animate-spin" />
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Syncing Library</p>
    </div>
  </div>
);

const Dashboard = () => {
  const userDetails = useUserStore((state) => state.userDetails);
  const userInfo = useUserStore((state) => state.userInfo);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["saved-news", userDetails, query],
    queryFn: async ({ pageParam = 1 }) => {
      const resp = await axios.get(`/api/save-news/${userDetails}?page=${pageParam}&limit=9&q=${query}`);
      return resp.data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!userDetails,
  });

  const allArticles = data?.pages.flatMap((page) => page.articles) || [];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
        
        {/* Breadcrumb & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-6">
             <Link 
               href="/"
               className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-900 transition-colors group"
             >
               <IoArrowBackOutline className="text-sm transition-transform group-hover:-translate-x-1" />
               <span>Back to Feed</span>
             </Link>

             <div className="space-y-2">
               <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-none">
                 Your <span className="text-slate-300 italic font-light">Archive.</span>
               </h1>
               <p className="text-sm font-medium text-slate-500 max-w-md">
                 Welcome back, <span className="text-slate-900 font-bold">{userInfo?.firstname || "Reader"}</span>. <br />
                 Manage and revisit the stories that matter to you.
               </p>
             </div>
          </div>

          {/* Premium Search Bar */}
          <div className="relative w-full md:w-80 group">
            <input
              type="text"
              placeholder="Search your library..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-slate-900/5 focus:border-slate-300 transition-all shadow-sm group-hover:shadow-md"
            />
            <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 text-lg transition-colors" />
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-12">
          {isLoading ? (
            <LoadingComponent />
          ) : isError ? (
            <ErrorComponent retry={refetch} />
          ) : allArticles.length > 0 ? (
            <div className="space-y-16">
              <GridLayout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allArticles.map((datum) => (
                  <NewsCard key={datum._id} datum={datum} />
                ))}
              </GridLayout>

              {/* Load More Section */}
              {hasNextPage && (
                <div className="flex justify-center pt-10">
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="px-12 py-4 bg-white border border-slate-200 text-slate-900 font-black text-[10px] uppercase tracking-[0.3em] rounded-full hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-500 shadow-lg shadow-slate-900/5 hover:shadow-xl active:scale-95 disabled:opacity-50"
                  >
                    {isFetchingNextPage ? (
                      <span className="flex items-center gap-3">
                        <LuLoader className="w-4 h-4 animate-spin" />
                        Syncing...
                      </span>
                    ) : (
                      "View More Stories"
                    )}
                  </button>
                </div>
              )}

              {!hasNextPage && (
                <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] py-10">
                  End of your collection
                </p>
              )}
            </div>
          ) : (
            <NodataComponent isSearch={!!query} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
