import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { LuTrash } from "react-icons/lu";
import { FiTrash2 } from "react-icons/fi";

const DeleteDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex justify-start items-center gap-1 text-sm py-1 px-1 border border-transparent rounded-sm active:scale-95 hover:border-red-600 transition-all duration-300">
          <span className="text-xl">
            <FiTrash2 />
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-[rgba(0,0,0,0.5)] data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-fit translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <div className="lg:w-[400px] py-5 rounded-md bg-white text space-y-10">
            <h1 className="text-2xl font-semibold text-black text-center">
              Are you sure you want to delete
            </h1>
            <div className="flex items-center justify-center gap-5">
              <button
                // onClick={() => deleteFn()}
                className="w-fit px-5 bg-red-700  py-2 text-base font-medium rounded-md text-white"
              >
                Delete
              </button>
              <Dialog.Close>
                <button className="w-fit px-5 bg-blue-500 py-2 text-base font-medium rounded-md text-white">
                  Cancel
                </button>
              </Dialog.Close>
            </div>
          </div>
          <Dialog.Close asChild>
            <button
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

export default DeleteDialog;
