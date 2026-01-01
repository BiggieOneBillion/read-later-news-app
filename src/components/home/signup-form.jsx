import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../../validation/auth-validation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "@/context/global-context";
import { LuMail, LuLock, LuUser, LuLoader, LuArrowLeft } from "react-icons/lu";

const SignUpForm = ({ gotoSignIn, close }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const { setAuth } = useGlobalContext();

  const mutations = useMutation({
    mutationFn: (info) => axios.post("/api/user", info),
    onSuccess: (data) => {
      setAuth(data.data._id);
      setTimeout(() => close(), 500);
    },
  });

  const onSubmit = (values) => mutations.mutate(values);

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center gap-4">
        <button 
          onClick={gotoSignIn}
          className="p-3 bg-slate-50 border border-slate-100 rounded-full hover:bg-white hover:shadow-md transition-all active:scale-90"
        >
          <LuArrowLeft className="w-4 h-4 text-slate-900" />
        </button>
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create Account</h1>
          <p className="text-xs font-medium text-slate-500">Join the RTNews community today</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1 text-nowrap">First Name</label>
            <div className="relative group">
              <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
              <input
                type="text"
                placeholder="John"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:bg-white focus:border-slate-900 transition-all"
                {...register("firstname")}
              />
            </div>
            {errors.firstname && <p className="text-[10px] font-bold text-red-500 ml-1 leading-tight">{errors.firstname.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1 text-nowrap">Last Name</label>
            <div className="relative group">
              <LuUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
              <input
                type="text"
                placeholder="Doe"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:bg-white focus:border-slate-900 transition-all"
                {...register("lastname")}
              />
            </div>
            {errors.lastname && <p className="text-[10px] font-bold text-red-500 ml-1 leading-tight">{errors.lastname.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">Email Address</label>
          <div className="relative group">
            <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:bg-white focus:border-slate-900 transition-all"
              {...register("email")}
            />
          </div>
          {errors.email && <p className="text-[10px] font-bold text-red-500 ml-1 leading-tight">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">Password</label>
          <div className="relative group">
            <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:bg-white focus:border-slate-900 transition-all"
              {...register("password")}
            />
          </div>
          {errors.password && <p className="text-[10px] font-bold text-red-500 ml-1 leading-tight">{errors.password.message}</p>}
        </div>

        {mutations.isError && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-[11px] font-bold text-red-600 text-center">{mutations.error.message}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={mutations.isPending}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-slate-900/10"
        >
          {mutations.isPending ? (
            <LuLoader className="w-5 h-5 animate-spin" />
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-slate-50 text-center">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          Already have an account?{" "}
          <button
            onClick={gotoSignIn}
            className="text-slate-900 font-black hover:underline underline-offset-4 decoration-2 transition-all ml-1"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
