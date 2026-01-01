import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "../../validation/auth-validation";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/store/user-store";
import { LuMail, LuLock, LuLoader } from "react-icons/lu";

const SignInForm = ({ gotoSignUp, close }) => {
  const setIsAllowedTrue = useUserStore((state) => state.setIsAllowedTrue);
  const setDetails = useUserStore((state) => state.setDetails);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
  });

  const mutations = useMutation({
    mutationFn: (info) => axios.post("/api/login", info),
    onSuccess: (data) => {
      setIsAllowedTrue();
      setDetails(data.data.userId);
      setUserInfo({firstname: data.data.firstname, lastname: data.data.lastname})
      setTimeout(() => close(), 800);
    },
  });

  const onSubmit = (values) => mutations.mutate(values);

  return (
    <div className="w-full max-w-md mx-auto space-y-8 animate-in fade-in zoom-in duration-300">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
        <p className="text-sm font-medium text-slate-500">
          Enter your details to access your saved news
        </p>
      </div>

      <form 
      // onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <LuMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:bg-white focus:border-slate-900 transition-all"
                {...register("email")}
              />
            </div>
            {errors.email && <p className="text-[11px] font-bold text-red-500 ml-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <LuLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 focus:bg-white focus:border-slate-900 transition-all"
                {...register("password")}
              />
            </div>
            {errors.password && <p className="text-[11px] font-bold text-red-500 ml-1">{errors.password.message}</p>}
          </div>
        </div>

        {mutations.isError && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-xs font-bold text-red-600 text-center">
              {mutations.error.response?.status === 400 ? "Incorrect email or password" : "Connection failed. Please try again."}
            </p>
          </div>
        )}

        {mutations.isSuccess && (
          <div className="p-3 bg-green-50 border border-green-100 rounded-xl">
            <p className="text-xs font-bold text-green-600 text-center">Login Successful! Redirecting...</p>
          </div>
        )}

        <button
          // onClick={(e) => {
          //   e.preventDefault();
          //   handleSubmit(onSubmit);
          // }}
          onClick={handleSubmit(onSubmit)}
          // type="submit"
          disabled={mutations.isPending}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-slate-900/10"
        >
          {mutations.isPending ? (
            <LuLoader className="w-5 h-5 animate-spin" />
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-slate-100 text-center">
        <p className="text-sm font-medium text-slate-500">
          Don&apos;t have an account?{" "}
          <button
            onClick={gotoSignUp}
            className="text-slate-900 font-bold hover:underline underline-offset-4 decoration-2 transition-all"
          >
            Create account
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
