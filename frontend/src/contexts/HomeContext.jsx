import { createContext, useContext, useEffect, useState } from "react";
import { getIndices } from "../services/marketService";
import { getNews } from "../services/newsService";

const HomeContext = createContext();

export function HomeProvider({ children }) {
  const [indices, setIndices] = useState({});
  const [news, setNews] = useState([])

  useEffect(() => {
    let isMounted = true;

    const fetchIndices  = async () => {
      try {
        const indexData = await getIndices();
        if (isMounted) {
          setIndices(indexData);
        }
      } catch (err) {
        console.error("Error loading home data:", err);
      }
    };

    const fetchNews = async () => {
      try {
        const newsData = await getNews();
        if (isMounted) {
          setNews(newsData);
        }
      } catch (error) {
        console.error("Error loading news:", err);
      }
    }

    fetchIndices();
    fetchNews();

    const intervalId = setInterval(fetchIndices , 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  return (
    <HomeContext.Provider value={{ indices, news }}>
      {children}
    </HomeContext.Provider>
  );
}

export function useHomeContext() {
  return useContext(HomeContext);
}
