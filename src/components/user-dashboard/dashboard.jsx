import React from "react";
import GridLayout from "../home/grid-layout";
import { v4 } from "uuid";
import NewsCard from "./news-card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import SettingsDropdown from "./menu";
import Link from "next/link";
import { useUserStore } from "@/store/user-store";

const ErrorComponent = ({ retry, error }) => (
  <div className="w-full grid place-content-center">
    <p className="flex items-center justify-start gap-2 text-sm font-medium text-slate-600">
      <span> Network Error! Internet is unstable. Click to</span>
      <span
        onClick={() => retry()}
        className="px-2 py-1 border rounded-sm active:scale-95 transition-transform duration-300 ease-linear text-sm font-medium cursor-pointer"
      >
        Reload
      </span>
    </p>
  </div>
);

const NodataComponent = () => {
  const router = useRouter();
  return (
    <div className="w-full grid place-content-center">
      <p className="flex items-center justify-start gap-2 text-sm font-medium text-slate-600">
        <span> No News Saved!! Go to the home page to save news articles</span>
        <span
          onClick={() => router.replace("/")}
          className="px-2 py-1 border rounded-sm active:scale-95 transition-transform duration-300 ease-linear text-sm font-medium cursor-pointer"
        >
          Home
        </span>
      </p>
    </div>
  );
};

const LoadingComponent = () => (
  <div className="w-full grid place-content-center">
    <div className="loader"></div>
  </div>
);

const Dashboard = () => {
  const userDetails = useUserStore((state) => state.userDetails);
  const router = useRouter();
  const { data, isLoading, isError, refetch, error } = useQuery({
    queryKey: [userDetails],
    queryFn: async () => {
      const data = await axios.get(`/api/save-news/${userDetails}`);
      return data;
    },
  });

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (isError) {
    console.log(error.response.data.message);
    return error.response.data.message === "No result" ? (
      <NodataComponent />
    ) : (
      <ErrorComponent retry={refetch} error={error} />
    );
  }

  if (data?.data.length === 0) {
    return (
      <div className="w-full grid place-content-center">
        <p className="flex items-center justify-start gap-2 text-sm font-medium text-slate-600">
          <span> No saved News, Click to go to home page</span>
          <Link
            href={"/"}
            className="px-2 py-1 border rounded-sm active:scale-95 transition-transform duration-300 ease-linear text-sm font-medium cursor-pointer"
          >
            Home
          </Link>
        </p>
      </div>
    );
  }


  return (
    <div className="h-fit w-full overflow-y-scroll mt-10 space-y-10">
      <header className="flex items-center justify-between">
        <div className="space-y-3">
          <button
            onClick={() => router.push("/")}
            className="border  py-1 px-2 text-sm font-medium bg-slate-900 text-white"
          >
            Go home
          </button>
          <div className="space-y-1">
            <h2 className="font-medium text-2xl text-slate-800">Saved News</h2>
            <p className="font-normal text-sm text-slate-400 hover:underline hover:underline-offset-1">
              This is a list of all your saved news, you can delete and search
              by title
            </p>
          </div>
        </div>
        <SettingsDropdown />
      </header>
      <main>
        <GridLayout className="grid lg:grid-cols-3 gap-10">
          {data?.data.map((datum) => (
            <NewsCard key={v4()} datum={datum} />
          ))}
        </GridLayout>
      </main>
    </div>
  );
};

export default Dashboard;

// [
//   {
//     _id: '662cc670bc5daad07e3a8c50',
//     author: 'Ioanna Lykiardopoulou',
//     title:
//       'UCL spinout bags £10M to make AI ‘super brains’ for 100x faster LLM training',
//     description:
//       'Oriole Networks, a UCL spinout, has raised £10mn in seed funding to build AI “super brains” that promise to accelerate the training of Large Language Models (LLMs).  Founded in 2023 by UCL scientists, the startup has developed a new method that harnesses the …',
//     url:
//       'https://thenextweb.com/news/ucl-spinout-bags-10m-ai-super-brains-100x-faster-llm-training',
//     urlToImage:
//       'https://img-cdn.tnwcdn.com/image/tnw-blurple?filter_last=1&fit=1280%2C640&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2024%2F03%2FUntitled-design-44.jpg&signature=c2e87d44b1a5d37a98c3f14034bf00f7',
//     publishedAt: '2024-03-27T16:40:49Z',
//     content:
//       'Oriole Networks, a UCL spinout, has raised £10mn in seed funding to build AI super brains that promise to accelerate the training of Large Language Models (LLMs). \r\n' +
//       'Founded in 2023 by UCL scientists,… [+2244 chars]',
//     user: '662c1b86418eb40221922b99',
//     __v: 0
//   },
//   {
//     _id: '662cc6ebcd4887646732295e',
//     author: 'Ioanna Lykiardopoulou',
//     title:
//       'UCL spinout bags £10M to make AI ‘super brains’ for 100x faster LLM training',
//     description:
//       'Oriole Networks, a UCL spinout, has raised £10mn in seed funding to build AI “super brains” that promise to accelerate the training of Large Language Models (LLMs).  Founded in 2023 by UCL scientists, the startup has developed a new method that harnesses the …',
//     url:
//       'https://thenextweb.com/news/ucl-spinout-bags-10m-ai-super-brains-100x-faster-llm-training',
//     urlToImage:
//       'https://img-cdn.tnwcdn.com/image/tnw-blurple?filter_last=1&fit=1280%2C640&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2024%2F03%2FUntitled-design-44.jpg&signature=c2e87d44b1a5d37a98c3f14034bf00f7',
//     publishedAt: '2024-03-27T16:40:49Z',
//     content:
//       'Oriole Networks, a UCL spinout, has raised £10mn in seed funding to build AI super brains that promise to accelerate the training of Large Language Models (LLMs). \r\n' +
//       'Founded in 2023 by UCL scientists,… [+2244 chars]',
//     user: '662c1b86418eb40221922b99',
//     __v: 0
//   },
//   {
//     _id: '662cc6f8cd48876467322961',
//     author: 'Andrii Degeler',
//     title:
//       'TNW Podcast: Ukrainian startups, European quantum tech, Michiel Scheffer on the future of the EIC',
//     description:
//       'Welcome to the new episode of the TNW Podcast — the show where we discuss the latest developments in the European technology ecosystem and feature interviews with some of the most interesting people in the industry. In today’s episode, Linnea, Tom (!), and An…',
//     url:
//       'https://thenextweb.com/news/podcast-ukrainian-startups-european-quantum-tech-future-eic',
//     urlToImage:
//       'https://img-cdn.tnwcdn.com/image/tnw-blurple?filter_last=1&fit=1280%2C640&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2023%2F12%2Ftnw-podcast-feat-1.png&signature=1ca57b225d69caf0b718b7a8dc0fc9a9',
//     publishedAt: '2024-03-27T16:49:13Z',
//     content:
//       'Welcome to the new episode of the TNW Podcast the show where we discuss the latest developments in the European technology ecosystem and feature interviews with some of the most interesting people in… [+506 chars]',
//     user: '662c1b86418eb40221922b99',
//     __v: 0
//   },
//   {
//     _id: '662cc704cd48876467322964',
//     author: 'Brian Heater',
//     title: 'Understanding humanoid robots',
//     description:
//       'More than half-a-century before the world caught its first glimpse of George Lucas’ droids, a small army of silvery humanoids took to the stages of the First...',
//     url: 'https://techcrunch.com/2024/03/27/understanding-humanoid-robots/',
//     urlToImage:
//       'https://s.yimg.com/ny/api/res/1.2/BJSHDwv.K7h14ibmVQazCg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02Mzg-/https://media.zenfs.com/en/techcrunch_350/bd6869cb01367202dd2b1ca317e24558',
//     publishedAt: '2024-03-27T22:54:26Z',
//     content:
//       'Robots made their stage debut the day after New Years 1921. More than half-a-century before the world caught its first glimpse of George Lucas droids, a small army of silvery humanoids took to the st… [+12010 chars]',
//     user: '662c1b86418eb40221922b99',
//     __v: 0
//   },
//   {
//     _id: '662cc70bcd48876467322967',
//     author: 'Ioanna Lykiardopoulou',
//     title:
//       'UCL spinout bags £10M to make AI ‘super brains’ for 100x faster LLM training',
//     description:
//       'Oriole Networks, a UCL spinout, has raised £10mn in seed funding to build AI “super brains” that promise to accelerate the training of Large Language Models (LLMs).  Founded in 2023 by UCL scientists, the startup has developed a new method that harnesses the …',
//     url:
//       'https://thenextweb.com/news/ucl-spinout-bags-10m-ai-super-brains-100x-faster-llm-training',
//     urlToImage:
//       'https://img-cdn.tnwcdn.com/image/tnw-blurple?filter_last=1&fit=1280%2C640&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2024%2F03%2FUntitled-design-44.jpg&signature=c2e87d44b1a5d37a98c3f14034bf00f7',
//     publishedAt: '2024-03-27T16:40:49Z',
//     content:
//       'Oriole Networks, a UCL spinout, has raised £10mn in seed funding to build AI super brains that promise to accelerate the training of Large Language Models (LLMs). \r\n' +
//       'Founded in 2023 by UCL scientists,… [+2244 chars]',
//     user: '662c1b86418eb40221922b99',
//     __v: 0
//   },
//   {
//     _id: '662cc710cd4887646732296a',
//     author: 'Alex Wilhelm',
//     title:
//       'TechCrunch Minute: Robinhood\'s credit card has arrived to take on Apple and any upcoming challengers',
//     description:
//       'Robinhood\'s new credit card was revealed Tuesday, and though it\'s only available for Robinhood Gold members, the Gold Card does have a feature that\'s...',
//     url:
//       'https://techcrunch.com/2024/03/27/techcrunch-minute-robinhoods-credit-card-has-arrived-to-take-on-apple-and-any-upcoming-challengers/',
//     urlToImage:
//       'https://s.yimg.com/ny/api/res/1.2/7Oab1eSgBVM2JJy4bbmFyA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02NzU-/https://media.zenfs.com/en/techcrunch_350/6fd1ca3893f50cbe33100f0402716646',
//     publishedAt: '2024-03-27T16:00:03Z',
//     content:
//       'Robinhood\'s new credit card was revealed Tuesday, and though it\'s only available for Robinhood Gold members, the Gold Card does have a feature that\'s spurring headlines: the ability to invest cash ba… [+1243 chars]',
//     user: '662c1b86418eb40221922b99',
//     __v: 0
//   }
// ]
