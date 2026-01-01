import React from "react";
import { CiBookmark } from "react-icons/ci";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "@/context/global-context";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserStore } from "@/store/user-store";

const SaveBtn = ({ data }) => {
  const { auth } = useGlobalContext();

  const id = useUserStore((state) => state.userDetails);

  const info = {
    author: data.author,
    content: data.content,
    description: data.description,
    publishedAt: data.publishedAt,
    title: data.title,
    urlToImage: data.urlToImage,
    url: data.url,
    userId: id,
  };

  const mutations = useMutation({
    mutationFn: () => {
      return axios.post("api/save-news", info);
    },
  });

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (id) {
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

  const getButtonStatus = () => {
    if (mutations.isPending) return "animate-pulse bg-white/40";
    if (mutations.isSuccess) return "bg-green-500/80 text-white border-green-400";
    if (mutations.isError) return "bg-red-500/80 text-white border-red-400";
    return "bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/30";
  };

  const getIconColor = () => {
    if (mutations.isSuccess) return "text-white";
    if (mutations.isError) return "text-white";
    return "text-white group-hover:text-white";
  };

  return (
    <button
      disabled={mutations.isPending || mutations.isSuccess}
      onClick={handleSave}
      aria-label="Save News"
      className={`
        flex items-center justify-center 
        w-10 h-10 rounded-full 
        border shadow-lg 
        active:scale-90 
        transition-all duration-300 
        group
        ${getButtonStatus()}
      `}
    >
      <span className={`text-2xl transition-all duration-300 ${getIconColor()}`}>
        <CiBookmark />
      </span>
      
      {/* Tooltip or status message for accessibility/clarity */}
      <span className="sr-only">
        {mutations.isPending ? "Saving..." : mutations.isSuccess ? "Saved" : "Save"}
      </span>
    </button>
  );
};

export default SaveBtn;
