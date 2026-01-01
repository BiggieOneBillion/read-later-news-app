import { getCurrentAndPastDate } from "@/libs/utils";

const dates = getCurrentAndPastDate();
const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export const navLinkData = [
  {
    name: "All",
    key: "general",
    url: `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&from=${dates.pastDate}&to=${dates.currentDate}&sortBy=popularity&apiKey=${API_KEY}`,
  },
  {
    name: "Technology",
    key: "technology",
    url: `https://newsapi.org/v2/top-headlines?category=technology&language=en&apiKey=${API_KEY}`,
  },
  {
    name: "Business",
    key: "business",
    url: `https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=${API_KEY}`,
  },
  {
    name: "Sports",
    key: "sports",
    url: `https://newsapi.org/v2/top-headlines?category=sports&language=en&apiKey=${API_KEY}`,
  },
  {
    name: "Science",
    key: "science",
    url: `https://newsapi.org/v2/top-headlines?category=science&language=en&apiKey=${API_KEY}`,
  },
  {
    name: "Health",
    key: "health",
    url: `https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey=${API_KEY}`,
  },
  {
    name: "Entertainment",
    key: "entertainment",
    url: `https://newsapi.org/v2/top-headlines?category=entertainment&language=en&apiKey=${API_KEY}`,
  },
];
