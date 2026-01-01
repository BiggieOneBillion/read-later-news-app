import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { LuUser, LuX } from "react-icons/lu";
import SignUpForm from "./signup-form";
import SignInForm from "./signin-form";

const SignInDialog = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => {
    setToggleForm(false);
    setIsOpen(false);
  };

  const handleToggle = () => setToggleForm(!toggleForm);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(val) => {
      if(!val) closeDialog();
      else openDialog();
    }}>
      <Dialog.Trigger asChild>
        <button
          className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-200 rounded-full text-xs font-black text-slate-900 uppercase tracking-widest hover:border-slate-800 hover:bg-slate-50 transition-all duration-300 shadow-sm active:scale-95"
        >
          <span>Sign In</span>
          <LuUser className="text-sm" />
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
        />
        <Dialog.Content 
          className="fixed left-[50%] top-[50%] z-50 w-full max-w-[90vw] sm:max-w-[480px] translate-x-[-50%] translate-y-[-50%] rounded-[2.5rem] bg-white p-8 sm:p-12 shadow-2xl focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] duration-300"
        >
          {/* Close Button */}
          <Dialog.Close asChild>
            <button
              className="absolute right-6 top-6 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all active:scale-90"
              aria-label="Close"
            >
              <LuX className="w-5 h-5" />
            </button>
          </Dialog.Close>

          {/* Form Content */}
          <div className="max-h-[75vh] overflow-y-auto no-scrollbar">
            {toggleForm ? (
              <SignUpForm gotoSignIn={handleToggle} close={closeDialog} />
            ) : (
              <SignInForm gotoSignUp={handleToggle} close={closeDialog} />
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SignInDialog;
