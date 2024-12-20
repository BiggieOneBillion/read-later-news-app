import { getCurrentAndPastDate } from "@/libs/utils";

const dates = getCurrentAndPastDate();

export const navLinkData = [
  {
    name: "All",
    key: "general",
    url: `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&from=${dates.currentDate}&to=${dates.pastDate}&sortBy=popularity&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
  },
  {
    name: "Business",
    key: "business",
    url: `https://newsapi.org/v2/top-headlines?country=us&domains=techcrunch.com,thenextweb.com&from=${dates.currentDate}&to=${dates.pastDate}&sortBy=popularity&category=business&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
  },
  // {
  //   name: "Sports",
  //   key: "sports",
  //   url: `https://newsapi.org/v2/top-headlines?country=us&domains=techcrunch.com,thenextweb.com&from=${dates.currentDate}&to=${dates.pastDate}&sortBy=popularity&category=sports&apiKey=${process.env.NEWS_API_KEY}`,
  // },
];
