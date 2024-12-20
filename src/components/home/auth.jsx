import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { LuUser } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUpForm from "./signup-form";
import SignInForm from "./signin-form";
import Link from "next/link";


const SignInDialog = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(),
  });

  const InputContainer = ({ label, register, name, type = "text" }) => (
    <div className="flex flex-col gap-2 text-black">
      <label className="capitalize text-sm font-semibold">{label}:</label>
      <input
        type={type}
        className="px-4 w-full py-2 text-base border rounded-md text-black bg-white"
        {...register(name)}
      />
      <span className="h-4 text-red-600 text-sm">
        {errors[name] && errors[name].message}
      </span>
      <Link></Link>
    </div>
  );

  const [toggleForm, setToggleForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => {
    setToggleForm(false);
    setIsOpen(false);
  };

  const handleToggle = () => setToggleForm(!toggleForm);

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger asChild>
        <button
          onClick={openDialog}
          className="text-base text-slate-800 font-medium flex justify-start items-center gap-1 border  hover:border-slate-500 transition-colors duration-300 px-2 py-1"
        >
          <span className="text-xs sm:text-sm">Sign In</span>
          <span className="text-xs sm:text-sm">
            <LuUser  />
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={`bg-[rgba(0,0,0,0.5)] data-[state=open]:animate-overlayShow fixed inset-0`}
        />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] overflow-y-scroll w-[90vw] max-w-fit translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-[#F3F2EE] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          {toggleForm ? (
            <SignUpForm gotoSignIn={handleToggle} close={closeDialog} />
          ) : (
            <SignInForm gotoSignUp={handleToggle} close={closeDialog} />
          )}
          <Dialog.Close asChild>
            <button
              onClick={closeDialog}
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SignInDialog;
