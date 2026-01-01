import React from "react";

const Intro = () => {
  const date = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return (
    <div className="relative w-full py-12 px-8 sm:px-12 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm overflow-hidden group transition-all duration-500 hover:shadow-xl">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-slate-900/[0.02] rounded-full blur-[100px] pointer-events-none transition-all duration-1000 group-hover:bg-slate-900/[0.04]"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-slate-500/[0.02] rounded-full blur-[80px] pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-6 max-w-2xl">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 transition-all duration-300 hover:bg-white hover:border-slate-200 cursor-default group/badge">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
            </span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{formattedDate}</span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[0.85]">
              Stay <span className="text-slate-300 italic font-light">Informed.</span>
              <br />
              Stay <span className="text-slate-300 italic font-light">Ahead.</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
            Experience news curated for the modern professional. 
            Don&apos;t let vital stories slip through the cracks—
            <span className="text-slate-900 font-bold decoration-slate-900/20 underline underline-offset-4 cursor-pointer hover:text-slate-600 transition-colors ml-1">
              save them for later
            </span> and build your personal knowledge base.
          </p>
        </div>

        {/* Social Proof / Stats Section */}
        <div className="hidden lg:block pb-2">
           <div className="flex -space-x-4 mb-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-14 h-14 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-md transition-transform hover:-translate-y-2 duration-300">
                   <img src={`https://i.pravatar.cc/100?u=${i + 20}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-14 h-14 rounded-full border-4 border-white bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white shadow-md z-10">
                 +12K
              </div>
           </div>
           <div className="space-y-1">
             <p className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">Globally Trusted</p>
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Real-time data architecture</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
