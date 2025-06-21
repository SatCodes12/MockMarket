import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchStockPrice } from "../services/marketService";
import "./StockHolding.css";

function StockHolding({ symbol, companyName, quantity, avgBuyPrice }) {
  const [currentPrice, setCurrentPrice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadPrice() {
      try {
        const data = await fetchStockPrice(symbol);
        setCurrentPrice(data["Current Price"]);
      } catch (err) {
        console.error("Error fetching price:", err);
        setCurrentPrice(null);
      }
    }

    loadPrice();
  }, [symbol]);

  const percentChange = currentPrice && avgBuyPrice
    ? (((currentPrice - avgBuyPrice) / avgBuyPrice) * 100).toFixed(2)
    : "N/A";

  const totalInvested = (quantity * avgBuyPrice).toFixed(2);
  const totalValue = currentPrice ? (quantity * currentPrice).toFixed(2) : null;
  const earnings = currentPrice ? (parseFloat(totalValue) - parseFloat(totalInvested)).toFixed(2) : null;

  const changeClass = percentChange !== "N/A"
    ? percentChange > 0
      ? "positive"
      : percentChange < 0
        ? "negative"
        : "neutral"
    : "";

  return (
    <div className="stock-holding" onClick={() => navigate(`/stock/${symbol}`)}>
      <div className="holding-info">
        <h4>{companyName} ({symbol})</h4>
        <p><strong>Quantity:</strong> <span>{quantity}</span></p>
        <p><strong>Average Price:</strong> <span>₹{avgBuyPrice.toFixed(2)}</span></p>
        <p><strong>Total Invested:</strong> <span>₹{totalInvested}</span></p>
      </div>
      <div className="price-info">
        {currentPrice !== null && (
          <>
            <p><strong>Current Price:</strong> <span>₹{currentPrice}</span></p>
            <p><strong>Total Current Value:</strong> <span>₹{totalValue}</span></p>
          </>
        )}
        <p>
          <strong>Returns:</strong>{" "}
          <span className={`pct-change ${changeClass}`}>
            ₹{earnings} ({percentChange}%)
          </span>
        </p>
      </div>
    </div>
  );
}

export default StockHolding;