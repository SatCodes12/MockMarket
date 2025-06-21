import { useParams } from "react-router-dom";
import { StockDetailsProvider, useStockDetailsContext } from "../contexts/StockDetailsContext";
import BarChartIcon from "../assets/BarChartIcon";
import PriceInfo from "../components/PriceInfo";
import Fundamentals from "../components/Fundamentals";
import OrderForm from "../components/OrderForm";
import "./StockDetails.css";

function StockDetailsContent() {
  const { stockData, loading } = useStockDetailsContext();

  if (loading) return <p className="status-message loading">Loading stock data...</p>;
  if (!stockData || stockData.error) return <p className="status-message error">No data found.</p>;

  const {
    Symbol = "",
    "Company Name": companyName = "",
    "Price Info": priceInfo = {},
    Fundamentals: fundamentals = {},
    "Current Price": livePrice = null,
  } = stockData;

  const cleanSymbol = Symbol.replace(".NS", "");
  const chartUrl = `https://in.tradingview.com/chart/CRV5xZ4t/?symbol=NSE%3A${cleanSymbol}`;

  const currentPrice = livePrice ?? priceInfo?.["Current"];

  function calculatePercentageChange(current, previousClose) {
    if (!current || !previousClose) return "N/A";
    const change = ((current - previousClose) / previousClose) * 100;
    return change.toFixed(2);
  }

  function getChangeClass() {
    const current = currentPrice;
    const previous = priceInfo?.["Previous Close"];
    if (!current || !previous) return "";
    if (current > previous) return "positive";
    if (current < previous) return "negative";
    return "neutral";
  }

  return (
    <div className="main-section">
      <div className="stock-details">
        <div className="stock-header">
          <div className="stock-info">
            <div>
              <h2>{companyName}</h2>
              <p className="stock-symbol">({cleanSymbol})</p>
              {currentPrice && (
                <p className="stock-current-price">
                  Current Price: <span>₹{currentPrice}</span>
                  {priceInfo?.["Previous Close"] && (
                    <span className={`percentage-change ${getChangeClass()}`}>
                      {calculatePercentageChange(currentPrice, priceInfo["Previous Close"])}%
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>
          <a
            href={chartUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="chart-link"
          >
            <BarChartIcon />
          </a>
        </div>

        <PriceInfo priceInfo={priceInfo} />
        <Fundamentals fundamentals={fundamentals} />
      </div>

      <OrderForm
        symbol={cleanSymbol}
        currentPrice={currentPrice}
      />
    </div>
  );
}

export default function StockDetails() {
  const { symbol } = useParams();
  return (
    <StockDetailsProvider symbol={symbol}>
      <StockDetailsContent />
    </StockDetailsProvider>
  );
}