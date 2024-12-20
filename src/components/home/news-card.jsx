import React from "react";
import Link from "next/link";
import SaveBtn from "./save-btn";
import Image from "next/image";

const NewsCard = ({ datum }) => {
  const date = new Date(datum.publishedAt);
  // Get the date portion in YYYY-MM-DD format
  const formattedDate = date.toISOString().slice(0, 10);

  return (
    <div className="space-y-10 py-10 px-2 md:px-5 lg:px-10 border border-slate-600 news-card">
      <div className="space-y-5">
        {/* date */}
        <div className="flex justify-between items-center">
          <p className="text-xs font-medium">{formattedDate}</p>
          <SaveBtn data={datum} />
        </div>
        {/* image-container */}
        <div className="w-full h-[200px]">
          <img
            src={datum.urlToImage}
            alt="article image"
            className="w-full h-full object-cover"
          />
        </div>
        {/* title */}
        <h2 className="font-semibold text-lg text-slate-800">
          {/* Lorem ipsum dolor sit amet consectetur. */}
          {datum.title}
        </h2>
        {/* description */}
        <p className="text-sm font-medium text-slate-600">
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, quaerat. */}
          {datum.description}
        </p>
      </div>
      {/* <a target="blank" href={datum.url} className="inline-block font-medium underline underline-offset-1 text-xs">
        Read More
      </a> */}
      {/* <Link
        // href={`https://newsapi.org/v2/everything?domains=${datum.source.id.replace(/-/g, '')}.com&q=${datum.title}&apiKey=35f81e68fa854e4b8f36ed72f667f642`}
        href={`/reading/${datum.source.id.replace(/-/g, "")}/${datum.title
          .replace(/ /g, "-")
          .replace(/,/g, "")}`}
        className="inline-block font-medium underline underline-offset-1 text-xs"
      >
        Read More
      </Link> */}
      <Link
        // href={`https://newsapi.org/v2/everything?domains=${datum.source.id.replace(/-/g, '')}.com&q=${datum.title}&apiKey=35f81e68fa854e4b8f36ed72f667f642`}
        href={`/reading/${datum.source.name
          .toLowerCase()
          .replace(/\s+/g, "")}/${datum.title
          .replace(/ /g, "-")
          .replace(/,/g, "")}`}
        className="inline-block font-medium underline underline-offset-1 text-xs"
      >
        Read More
      </Link>
    </div>
  );
};

export default NewsCard;
