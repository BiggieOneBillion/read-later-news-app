import { useContext, useState, createContext } from "react";

const GlobalContext = createContext(null);

function getCurrentAndPastDate() {
  const currentDate = new Date();

  // Clone current date and subtract 3 days
  const pastDate = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - 3);

  // Format dates to a readable format (YYYY-MM-DD)
  const formatDate = (date) => date.toISOString().split("T")[0];

  return {
    currentDate: formatDate(currentDate),
    pastDate: formatDate(pastDate),
  };
}

const dates = getCurrentAndPastDate();

export const GlobalContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  const [newsUrl, setNewsUrl] = useState(
    `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&from=${dates.currentDate}&to=${dates.pastDate}&sortBy=popularity&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
  );
  const [newsKey, setNewsKey] = useState("general");

  return (
    <GlobalContext.Provider
      value={{ auth, setAuth, newsUrl, setNewsUrl, newsKey, setNewsKey }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
