import { useEffect, useState } from "react";
import StockHolding from "../components/StockHolding";
import { getUserHoldings, getTotalInvested } from "../services/holdingService";
import { getBalance } from "../services/profileService";
import { fetchStockPrice } from "../services/marketService";
import "./Portfolio.css";

function Portfolio() {
  const [balance, setBalance] = useState(100000);
  const [invested, setInvested] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    async function loadPortfolioData() {
      try {
        const [balRes, invRes, holdRes] = await Promise.all([
          getBalance(),
          getTotalInvested(),
          getUserHoldings(),
        ]);

        setBalance(parseFloat(balRes.balance) || 0);
        setInvested(parseFloat(invRes.totalHoldingsValue) || 0);
        setHoldings(holdRes || []);

        const prices = await Promise.all(
          holdRes.map(stock => fetchStockPrice(stock.company_symbol))
        );

        let totalValue = 0;
        for (let i = 0; i < holdRes.length; i++) {
          const currentPrice = prices[i]["Current Price"] || 0;
          totalValue += holdRes[i].quantity * currentPrice;
        }

        setPortfolioValue(totalValue);
      } catch (error) {
        console.error("Failed to load portfolio data:", error);
      }
    }

    loadPortfolioData();
  }, []);

  const percentChange = invested > 0 ? (((portfolioValue - invested) / invested) * 100).toFixed(2) : "0.00";

  const totalEarnings = invested > 0 ? (portfolioValue - invested).toFixed(2) : "0.00";

  return (
    <div className="portfolio-container">
      <h2>Summary</h2>
      <div className="portfolio-summary">
        <p><strong>Current Balance:</strong> <span className="value">₹{balance.toFixed(2)}</span></p>
        <p><strong>Invested Value:</strong> <span className="value">₹{invested.toFixed(2)}</span></p>
        <p> <strong>Portfolio Value:</strong> <span className="value">₹{portfolioValue.toFixed(2)}</span>{" "}</p>
        <p>
          <strong>Unrealised Profit/Loss: </strong>
          <span className={`change ${percentChange > 0 ? "positive" : percentChange < 0 ? "negative" : ""}`}>
            ₹{totalEarnings} ({percentChange}%)
          </span>
        </p>
      </div>

      <h2>My holdings</h2>
      {holdings.length === 0 ? (
        <p className="no-holdings">You don't have any stocks in your portfolio.</p>
      ) : (
        <div className="holdings-list">
          {holdings.map((stock) => (
            <StockHolding
              key={stock.id}
              symbol={stock.company_symbol}
              companyName={stock.name}
              quantity={parseInt(stock.quantity)}
              avgBuyPrice={parseFloat(stock.avg_buy_price)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Portfolio;