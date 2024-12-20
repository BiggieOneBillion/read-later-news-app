import Index from "@/components/reading-user-news";

export default function Reading({ params }) {
  const { id } = params;
  // console.log(params);
  return <Index id={id} />;
}
