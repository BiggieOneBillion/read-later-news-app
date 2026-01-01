"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { IoArrowBackOutline, IoCalendarOutline, IoPersonOutline, IoGlobeOutline } from "react-icons/io5";
import { LuLoader, LuAlertCircle } from "react-icons/lu";

const ErrorComponent = ({ retry }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-6">
    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 shadow-sm">
      <LuAlertCircle className="w-8 h-8" />
    </div>
    <div className="text-center space-y-2">
      <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Article Unreachable</h3>
      <p className="text-sm text-slate-500 max-w-xs mx-auto">We couldn't retrieve this story from your archive. Please check your connection.</p>
    </div>
    <button
      onClick={() => retry()}
      className="px-8 py-3 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-full active:scale-95 transition-all shadow-xl shadow-slate-900/10"
    >
      Retry Feed
    </button>
  </div>
);

const LoadingComponent = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6">
    <div className="relative">
      <div className="w-20 h-20 border-4 border-slate-100 rounded-full"></div>
      <LuLoader className="w-20 h-20 text-slate-900 animate-spin absolute top-0 left-0 border-t-4 border-transparent rounded-full" />
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">Immersing...</p>
  </div>
);

const Index = ({ id }) => {
  const router = useRouter();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["reading-news", id],
    queryFn: async () => {
      const resp = await axios.get(`/api/read-user-news/${id}`);
      return resp.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <LoadingComponent />;
  if (isError) return <ErrorComponent retry={refetch} />;

  const article = data?.data;
  if (!article) return <ErrorComponent retry={refetch} />;

  const date = new Date(article.publishedAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Immersive Reader Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-8 py-12 lg:py-20 space-y-12">
        
        {/* Breadcrumb Navigation */}
        <nav className="mb-12">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2.5 text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] hover:text-slate-900 transition-all group"
          >
            <IoArrowBackOutline className="text-sm transition-transform group-hover:-translate-x-1.5" />
            <span>Back to Archive</span>
          </button>
        </nav>

        {/* Header Section */}
        <header className="space-y-10">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none lg:leading-[0.9]">
              {article.title}
            </h1>
            
            {/* Meta Metadata Grid */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-4 border-t border-slate-100">
               <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                   <IoPersonOutline className="text-xs" />
                 </div>
                 <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">{article.author || "Global Correspondent"}</span>
               </div>

               <div className="flex items-center gap-3 text-slate-400">
                 <IoCalendarOutline className="text-sm" />
                 <span className="text-[10px] font-black uppercase tracking-widest">{formattedDate}</span>
               </div>

               {article.url && (
                 <a 
                   href={article.url} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-slate-700 transition-colors ml-auto shadow-lg shadow-slate-900/10"
                 >
                   <IoGlobeOutline className="text-xs" />
                   Source
                 </a>
               )}
            </div>
          </div>

          {/* Featured Image */}
          {article.urlToImage && (
            <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 group">
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2.5rem]"></div>
            </div>
          )}
        </header>

        {/* Article Body */}
        <section className="max-w-2xl mx-auto">
          <div className="prose prose-slate lg:prose-lg">
            <p className="text-lg md:text-xl lg:text-2xl font-medium text-slate-600 leading-relaxed text-justify first-letter:text-6xl md:first-letter:text-8xl first-letter:font-black first-letter:text-slate-900 first-letter:mr-4 first-letter:float-left first-letter:leading-none selection:bg-slate-900 selection:text-white">
              {article.content || article.description}
            </p>
          </div>

          {/* Footer Decoration */}
          <div className="mt-20 pt-10 border-t border-slate-100 flex items-center justify-center">
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-200"></span>
              <span className="w-2 h-2 rounded-full bg-slate-900"></span>
              <span className="w-2 h-2 rounded-full bg-slate-200"></span>
            </div>
          </div>
        </section>
      </article>

      {/* Floating Gradient for ambiance */}
      <div className="fixed top-0 right-0 w-1/3 h-1/3 bg-slate-50/50 blur-[120px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-0 left-0 w-1/4 h-1/4 bg-slate-100/30 blur-[100px] pointer-events-none -z-10"></div>
    </div>
  );
};

export default Index;
