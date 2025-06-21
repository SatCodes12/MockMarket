import { createContext, useContext, useEffect, useState } from "react";
import { fetchStockDetails, fetchStockPrice } from "../services/marketService";

const StockDetailsContext = createContext();

export function useStockDetailsContext() {
  return useContext(StockDetailsContext);
}

export function StockDetailsProvider({ symbol, children }) {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let intervalId = null;
    let isMounted = true;

    async function loadInitialDetails() {
      try {
        setLoading(true);
        const fullData = await fetchStockDetails(symbol);
        if (!isMounted) return;

        setStockData(fullData);
        setLoading(false);

        intervalId = setInterval(async () => {
          try {
            const priceData = await fetchStockPrice(symbol);
            if (!isMounted) return;
            setStockData(prevData => ({
              ...prevData,
              "Current Price": priceData["Current Price"],
            }));
          } catch (err) {
            console.error("Error fetching stock price:", err);
          }
        }, 5000);
      } catch (err) {
        console.error("Error fetching stock details:", err);
        if (isMounted) {
          setStockData({ error: "Failed to fetch stock data" });
          setLoading(false);
        }
      }
    }

    if (symbol) {
      loadInitialDetails();
    }

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  }, [symbol]);

  return (
    <StockDetailsContext.Provider value={{ stockData, loading }}>
      {children}
    </StockDetailsContext.Provider>
  );
}