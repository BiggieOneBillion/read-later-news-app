"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ErrorComponent = () => (
  <div className="w-full grid place-content-center">
    <p className="flex items-center justify-start gap-2 text-sm font-medium text-slate-600">
      <span> Network Error! Internet is unstable. Click to</span>
      <span className="px-2 py-1 border rounded-sm active:scale-95 transition-transform duration-300 ease-linear text-sm font-medium cursor-pointer">
        Reload
      </span>
    </p>
  </div>
);

const LoadingComponent = () => (
  <div className="w-full grid place-content-center">
    <div className="loader"></div>
  </div>
);

const Index = ({ id }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const data = await axios.get(`/api/read-user-news/${id}`);
      return data;
    },
  });

  const router = useRouter();

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <ErrorComponent />;
  }

  const mainArticle = data.data.data;

  return (
    <>
      <div className="space-y-4">
        <button
          onClick={() => router.back()}
          className="border  py-1 px-2 text-sm font-medium bg-slate-900 text-white"
        >
          Go home
        </button>
        <div className="space-y-10y h-fit flex-col lg:flex-rowy lg:w-[500px] mx-auto flex items-start justify-start sm:items-center gap-10 mt-5 lg:mt-20">
          {/* Image and title */}
          <section className="w-full h-fit lg:w-[500px] space-y-5">
            <div className="w-full h-[50vh] md:h-[400px] lg:w-[500px]  lg:h-[500px]">
              <img
                src={mainArticle.urlToImage}
                alt={mainArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* title */}
            <h2 className="font-semibold text-xl lg:text-2xl text-slate-800">
              {mainArticle.title}
            </h2>
          </section>
          {/* description */}
          <section className="flex-1">
            {/* description */}
            <p className="text-sm lg:text-base font-normal text-justify tracking-wide text-slate-600">
              <span className="font-semibold md:text-[40px] text-black">
                {mainArticle.content.slice(0, 1)}
              </span>
              {mainArticle.content.slice(1)}
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Index;
