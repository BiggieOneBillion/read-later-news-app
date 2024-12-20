import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "../../validation/auth-validation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "@/context/global-context";

const SignUpForm = ({ gotoSignIn, close }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const { setAuth } = useGlobalContext();

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
      return axios.post("/api/user", info);
    },
    onSuccess: (data) => {
      setAuth(data.data._id);
      setTimeout(() => {
        close();
      }, 500);
    },
  });

  const onSubmit = (values) => {
    console.log(values);
    mutations.mutate(values);
  };

  return (
    <div className="w-[300px] lg:min-w-[500px] h-fit overflow-y-scroll px-2 sm:px-10 rounded-md bg-[#F3F2EE] text space-y-5">
      <h1 className="text-2xl font-semibold text-black text-center">Sign Up</h1>
      <p className="flex-col items-start sm:flex-row flex sm:items-center justify-start gap-1 text-sm text-slate-500">
        <span>Do you have an account already?</span>
        <button
          onClick={gotoSignIn}
          className="underline underline-offset-1 hover:underline-offset-2"
        >
          Sign In
        </button>
      </p>
      <form className="space-y-2">
        {mutations.isError && (
          <span className="font-medium text-sm rounded-md inline-block py-2 px-2 bg-red-400 text-red-800 w-full">
            {mutations.error.message}
          </span>
        )}
        {mutations.isSuccess && (
          <span className="font-medium text-sm rounded-md inline-block py-2 px-2 bg-green-400 text-green-800 w-full">
            Successfully Logged In
          </span>
        )}
        <InputContainer
          label={"First Name"}
          name={"firstname"}
          register={register}
        />
        <InputContainer
          label={"Last Name"}
          name={"lastname"}
          register={register}
        />
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
          className="w-fit px-10 bg-green-700  py-2 text-base font-medium rounded-md text-white disabled:cursor-none disabled:bg-[#02EDAF] "
        >
          {mutations.isPending ? "...Loading" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default SignUpForm;
