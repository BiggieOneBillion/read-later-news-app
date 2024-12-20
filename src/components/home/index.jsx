"use client";

import React from "react";
import Navbar from "./navbar";
import Grid from "../grid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "@/context/global-context";
import Intro from "./intro";

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

const TryAgainComponent = () => {
  return (
    <div className="w-full h-[80vh] pt-[30vh] flex justify-center">
      <h2 className="text-slate-600 font-medium text-base">
        Please wait. We will be back{" "}
      </h2>
    </div>
  );
};

const Index = () => {
  const { newsUrl, newsKey } = useGlobalContext();
  const { data, isLoading, isError } = useQuery({
    queryKey: [newsKey],
    queryFn: async () => {
      const data = await axios.get(newsUrl);
      return data;
    },
  });

  return (
    <div className="space-y-5">
      <Intro />
      <div className="space-y-10">
        <Navbar />
        {isLoading ? (
          <LoadingComponent />
        ) : isError ? (
          <ErrorComponent />
        ) : data?.data.articles.length > 0 ? (
          <Grid data={data.data.articles} />
        ) : (
          <TryAgainComponent />
        )}
      </div>
    </div>
  );
};

export default Index;
