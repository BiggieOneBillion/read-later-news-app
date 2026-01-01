import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { LuTrash2, LuX, LuAlertTriangle, LuShieldAlert } from "react-icons/lu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast, Slide } from "react-toastify";

const DeleteDialog = ({ datum }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/save-news/delete", { id: datum._id });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["saved-news"]);
      toast.success("Story removed from archive", {
        position: "top-right",
        autoClose: 2000,
        transition: Slide,
        theme: "dark",
        className: "text-[10px] font-black uppercase tracking-widest",
      });
    },
    onError: () => {
      toast.error("Failed to remove story", {
        position: "top-right",
        autoClose: 3000,
        transition: Slide,
        theme: "dark",
        className: "text-[10px] font-black uppercase tracking-widest",
      });
    }
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-md border border-slate-100 rounded-2xl text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all duration-300 shadow-sm active:scale-95 group group/del">
          <LuTrash2 className="text-lg transition-transform group-hover/del:scale-110" />
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="bg-slate-900/40 backdrop-blur-sm fixed inset-0 z-[100] animate-in fade-in duration-300" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white rounded-[2.5rem] p-8 shadow-2xl z-[101] focus:outline-none animate-in fade-in zoom-in-95 duration-300">
          
          {/* Header Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 shadow-inner">
               {/* <LuAlertTriangle className="w-7 h-7" /> */}
               <LuShieldAlert className="w-7 h-7" />
            </div>
          </div>

          <div className="space-y-4 text-center">
            <Dialog.Title className="text-2xl font-black text-slate-900 tracking-tight">
              Permanently delete?
            </Dialog.Title>
            <Dialog.Description className="text-sm font-medium text-slate-500 leading-relaxed px-4">
              You are about to remove <span className="text-slate-900 font-bold">"{datum?.title?.slice(0, 40)}..."</span> from your digital library. This action cannot be reversed.
            </Dialog.Description>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-10">
            <Dialog.Close asChild>
              <button className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors">
                Keep Story
              </button>
            </Dialog.Close>
            <button
              onClick={() => mutation.mutate()}
              disabled={mutation.isPending}
              className="w-full py-4 bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? "Removing..." : "Delete Permanently"}
            </button>
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full text-slate-300 hover:text-slate-900 hover:bg-slate-50 transition-all"
              aria-label="Close"
            >
              <LuX className="text-lg" />
            </button>
          </Dialog.Close>

        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteDialog;
