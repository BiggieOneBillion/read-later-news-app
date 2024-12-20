"use client"
import Index from "@/components/reading";
import { useParams } from "next/navigation";

export default function Home() {
  const params = useParams()
  // console.log(params);
  return (
     <Index />
  );
}