"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useParams, useRouter } from "next/navigation";

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

const Index = () => {
  const param = useParams();
  const router = useRouter();
  // console.log(param);

  // console.log(`https://newsapi.org/v2/everything?domains=${param.domain.replace('.com', '')}.com&q=${param.topic}&apiKey=35f81e68fa854e4b8f36ed72f667f642`);

  const { data, isLoading, isError } = useQuery({
    queryKey: [param.topic],
    queryFn: async () => {
      const data = await axios.get(
        `https://newsapi.org/v2/everything?domains=${param.domain.replace(
          ".com",
          ""
        )}.com&q=${param.topic}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
      );
      return data;
    },
  });

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <ErrorComponent />;
  }

  const mainArticle = data.data.articles;
  console.log(mainArticle);

  return (
    <>
      {mainArticle.length > 0 && (
        <div className="space-y-4">
          <button
            onClick={() => router.push("/")}
            className="border  py-1 px-2 text-sm font-medium bg-slate-900 text-white"
          >
            Go home
          </button>
          <div className="space-y-10y h-fit flex-col lg:flex-rowy lg:w-[500px] mx-auto flex items-start justify-start sm:items-center gap-10 mt-5 lg:mt-20">
            {/* Image and title */}
            <section className="w-full h-fit lg:w-[500px] space-y-5">
              <div className="w-full h-[50vh] md:h-[400px] lg:w-[500px]  lg:h-[500px]">
                <img
                  src={mainArticle[0].urlToImage}
                  alt={mainArticle[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* title */}
              <h2 className="font-semibold text-xl lg:text-2xl text-slate-800">
                {/* Lorem ipsum dolor sit amet consectetur. */}
                {mainArticle[0].title}
              </h2>
            </section>
            {/* description */}
            <section className="flex-1">
              {/* description */}
              <p className="text-sm lg:text-base font-normal text-justify tracking-wide text-slate-600">
                <span className="font-semibold md:text-[40px] text-black">
                  {mainArticle[0].content.slice(0, 1)}
                </span>
                {mainArticle[0].content.slice(1)}
              </p>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
