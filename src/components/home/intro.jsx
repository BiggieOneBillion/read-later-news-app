import React from "react";

const Intro = () => {
  return (
    <div className="flex flex-col gap-1 w-full py-2 px-4 rounded-md bg-[rgba(0,0,0,0.03)]">
      <p className="font-medium text-sm sm:text-lg text-slate-700">Welcome to RTNews</p>
      <p className="text-xs sm:text-sm text-slate-500 font-normal">
        Get your latest news and be up-to-date on current issues, and if you
        don&apos;t have time to read then{" "}
        <span className="font-medium sm:italic sm:text-slate-800 py-1 px-2 sm:px-0 rounded-md bg-slate-800 sm:bg-transparent text-white inline-block">
          {" "}
          save it for later.
        </span>
      </p>
    </div>
  );
};

export default Intro;
