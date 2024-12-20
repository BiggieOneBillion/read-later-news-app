import React from "react";
import { CiBookmark } from "react-icons/ci";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "@/context/global-context";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SaveBtn = (data) => {
  const { auth } = useGlobalContext();

  const info = {
    author: data.data.author,
    content: data.data.content,
    description: data.data.description,
    publishedAt: data.data.publishedAt,
    title: data.data.title,
    urlToImage: data.data.urlToImage,
    url: data.data.url,
    userId: auth,
  };

  const mutations = useMutation({
    mutationFn: () => {
      return axios.post("api/save-news", info);
    },
  });

  const handleSave = () => {
    // first check if the user is signed in
    if (auth) {
      mutations.mutate();
      return;
    }
    return toast.error("Sign In To Save News", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
  };

  return (
    <button
      disabled={mutations.isPending}
      onClick={handleSave}
      className="flex disabled:cursor-none justify-start items-center gap-1 text-sm py-1 px-2 border rounded-sm active:scale-95 hover:border-slate-400 transition-all duration-300  "
    >
      <span className="text-xl">
        <CiBookmark />
      </span>
      {mutations.isPending ? (
        <span className="font-semibold">saving...</span>
      ) : mutations.isSuccess ? (
        <span className="font-semibold">saved</span>
      ) : mutations.isError ? (
        <span className="font-semibold">
          {mutations.error.message === "Request failed with status code 420"
            ? "Saved Already"
            : "Try Again"}
        </span>
      ) : (
        <span className="font-semibold">save</span>
      )}
    </button>
  );
};

export default SaveBtn;
