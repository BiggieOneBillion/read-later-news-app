import { useContext, useState, createContext } from "react";

function getCurrentAndPastDate() {
  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - 3);

  const formatDate = (date) => date.toISOString().split("T")[0];

  return {
    currentDate: formatDate(currentDate),
    pastDate: formatDate(pastDate),
  };
}

const dates = getCurrentAndPastDate();

const GlobalContext = createContext(null);

export const GlobalContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  // fixed from/to order: from should be the older date
  const [newsUrl, setNewsUrl] = useState(
    `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&from=${dates.pastDate}&to=${dates.currentDate}&sortBy=popularity&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
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
