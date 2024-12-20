import React from "react";
import { IoBookmarkSharp } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import DialogBox from "./dialog-box";
import DeleteDialog from "./dialog-box";
import Image from "next/image";

const NewsCard = ({ datum }) => {
  return (
    <div className="space-y-10 py-10 px-2 md:px-5 lg:px-10 border border-slate-400 hover:border-slate-600 transition duration-300  ">
      <div className="space-y-5">
        {/* date */}
        <div className="flex justify-between items-center">
          <p className="text-xs font-medium">September, 04 2024</p>
          {/* <button className="flex justify-start items-center gap-1 text-sm py-1 px-2  rounded-sm active:scale-95 hover:border-slate-400 transition-all duration-300  ">
            <span className="text-xl">
              <FiTrash2 />
            </span>
          </button> */}
          <DeleteDialog />
        </div>
        {/* image-container */}
        <div className="w-full h-[200px]">
          <img
            src={datum.urlToImage}
            alt=""
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
      <Link
        href={`/user/dashboard/news/reading/${datum._id}`}
        className="inline-block font-medium underline underline-offset-1 text-xs"
      >
        Read More
      </Link>
    </div>
  );
};

export default NewsCard;
