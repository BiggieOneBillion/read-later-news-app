"use client";

import React, { useEffect } from "react";
import Navbar from "./navbar";
import Grid from "../grid";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "@/context/global-context";
import Intro from "./intro";

const ErrorComponent = () => (
  <div className="w-full grid place-content-center py-10">
    <div className="text-center space-y-4">
      <p className="text-sm font-semibold text-red-600 bg-red-50 px-4 py-2 rounded-full border border-red-100">
        Network Error! Please check your connection.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold active:scale-95 transition-all shadow-lg hover:bg-slate-800"
      >
        Reload Page
      </button>
    </div>
  </div>
);

const LoadingComponent = () => (
  <div className="w-full grid place-content-center py-20">
    <div className="flex flex-col items-center gap-4">
      <div className="loader"></div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse">Fetching latest news...</p>
    </div>
  </div>
);

const Index = () => {
  const { newsUrl, newsKey } = useGlobalContext();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: [newsKey, newsUrl],
    queryFn: async ({ pageParam = 1 }) => {
      // Append page and pageSize to the newsUrl
      const pageUrl = `${newsUrl}&page=${pageParam}&pageSize=12`;
      const response = await axios.get(pageUrl);
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalResults = lastPage.totalResults;
      const currentCount = allPages.flatMap(page => page.articles).length;
      
      // NewsAPI sometimes limits free tier to 100 results
      if (currentCount < totalResults && currentCount < 100) {
        return allPages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  const allArticles = data?.pages.flatMap((page) => page.articles) || [];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10">
        <Intro />
        
        <div className="space-y-12">
          {isLoading ? (
            <LoadingComponent />
          ) : isError ? (
            <ErrorComponent />
          ) : allArticles.length > 0 ? (
            <div className="space-y-12">
              <Grid data={allArticles} />
              
              {hasNextPage && (
                <div className="flex justify-center pt-8">
                  <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="px-8 py-3 bg-white border-2 border-slate-900 text-slate-900 font-bold rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-xl active:scale-95"
                  >
                    {isFetchingNextPage ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        Loading More...
                      </span>
                    ) : (
                      "Load More Articles"
                    )}
                  </button>
                </div>
              )}
              
              {!hasNextPage && allArticles.length > 0 && (
                <p className="text-center text-slate-400 text-sm font-medium italic tracking-tight">
                  You've reached the end of the news feed.
                </p>
              )}
            </div>
          ) : (
            <div className="w-full h-[40vh] flex flex-col items-center justify-center space-y-4">
               <h2 className="text-slate-400 font-bold text-xl uppercase tracking-tighter">No articles found</h2>
               <p className="text-slate-500 text-sm">Try exploring a different category or search term.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
