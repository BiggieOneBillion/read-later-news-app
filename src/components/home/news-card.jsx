import React from "react";
import Link from "next/link";
import SaveBtn from "./save-btn";

const NewsCard = ({ datum }) => {
  const date = new Date(datum.publishedAt);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Placeholder image if urlToImage is missing
  const imageUrl = datum.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop";

  return (
    <div className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 ease-out h-full">
      {/* Image Container */}
      <div className="relative w-full h-60 overflow-hidden">
        <img
          src={imageUrl}
          alt={datum.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
          loading="lazy"
        />
        
        {/* Save Button - Positioned absolutely at top right with glassmorphism */}
        <div className="absolute top-4 right-4 z-10">
          <SaveBtn data={datum} />
        </div>

        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-500"></div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        {/* Meta Info: Source and Date */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-2.5 py-1 bg-slate-900 text-[10px] font-bold text-white rounded-md uppercase tracking-wider">
            {datum.source.name}
          </span>
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
            {formattedDate}
          </span>
        </div>

        {/* Title and Description */}
        <div className="flex-1 space-y-3">
          <h2 className="font-bold text-xl text-slate-900 leading-tight line-clamp-2 group-hover:text-slate-700 transition-colors duration-300">
            {datum.title}
          </h2>
          <p className="text-[13px] font-medium text-slate-500 line-clamp-3 leading-relaxed">
            {datum.description}
          </p>
        </div>

        {/* Footer: Read Story link */}
        <div className="pt-6 mt-6 border-t border-slate-50">
          <Link
            href={`/reading/${datum.source.name
              .toLowerCase()
              .replace(/\s+/g, "-")}/${encodeURIComponent(datum.title
              .replace(/ /g, "-")
              .replace(/,/g, ""))}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-[0.2em] group/link"
          >
            <span>Read Story</span>
            <svg 
              className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
