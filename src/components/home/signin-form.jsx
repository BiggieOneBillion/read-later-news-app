import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "../../validation/auth-validation";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/store/user-store";

const SignInForm = ({ gotoSignUp, close }) => {
  const setIsAllowedTrue = useUserStore((state) => state.setIsAllowedTrue);
  const setDetails = useUserStore((state) => state.setDetails);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
  });

  const InputContainer = ({ label, register, name, type = "text" }) => (
    <div className="flex flex-col gap-2 text-black">
      <label className="capitalize text-[13px] font-medium text-gray-600">
        {label}:
      </label>
      <input
        type={type}
        className="px-4 w-full py-2 text-base border rounded-md text-black bg-[#F3F2EE]"
        {...register(name)}
      />
      <span className="h-4 text-red-600 text-sm">
        {errors[name] && errors[name].message}
      </span>
    </div>
  );

  const mutations = useMutation({
    mutationFn: (info) => {
      return axios.post("/api/login", info);
    },
    onSuccess: (data) => {
      setIsAllowedTrue();
      setDetails(data.data.userId);
      setTimeout(() => {
        close();
      }, 800);
    },
  });

  const onSubmit = async (values) => {
    // console.log(values);
    //  const response = await axios.post('https://flutternewsdb.onrender.com/api/v1/user/login', values)
    //  if (response.status === 200) {
    //     // console.log(response.data.userId)
    //     setAuth(response.data.userId)
    //  }
    mutations.mutate(values);
  };
  return (
    <div className="w-[300px] md:min-w-[500px] px-2 md:px-10 rounded-md bg-[#F3F2EE] text space-y-5">
      <h1 className="text-2xl font-semibold text-black text-center">Sign In</h1>
      <p className="flex items-center justify-start gap-1 text-sm text-slate-500">
        <span>Don&apos;t have an account?</span>
        <button
          onClick={gotoSignUp}
          className="underline underline-offset-1 hover:underline-offset-2"
        >
          Sign Up
        </button>
      </p>

      <form className="space-y-2">
        {mutations.isError && (
          <span className="font-medium text-sm rounded-md inline-block py-2 px-2 bg-red-400 text-red-800 w-full">
            {mutations.error.name === "AxiosError"
              ? "Unstable Network. Try Again"
              : "Username or password incorrect"}
          </span>
        )}
        {mutations.isSuccess && (
          <span className="font-medium text-sm rounded-md inline-block py-2 px-2 bg-green-400 text-green-800 w-full">
            Successfully Logged In
          </span>
        )}
        <InputContainer label={"Email"} name={"email"} register={register} />
        <InputContainer
          label={"Password"}
          name={"password"}
          register={register}
          type="password"
        />
      </form>
      <div className="flex items-center w-full justify-start gap-5">
        <button
          disabled={mutations.isPending}
          onClick={handleSubmit(onSubmit)}
          className="w-fit px-10 bg-green-700 active:scale-95 duration-300 transition-transform  py-2 text-base font-medium rounded-md text-white disabled:cursor-none disabled:bg-[#02EDAF] "
        >
          {mutations.isPending ? "...Loading" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default SignInForm;
