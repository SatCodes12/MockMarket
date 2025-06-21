import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchCompanies } from "../services/companyService";
import "./TradeLab.css";

function TradeLab() {
  const [symbol, setSymbol] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (symbol.trim() === "") {
        setSuggestions([]);
        return;
      }

      try {
        const res = await searchCompanies(symbol.trim());
        setSuggestions(res);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [symbol]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (symbol.trim() !== "") {
      navigate(`/stock/${symbol.toUpperCase()}`);
    }
  };

  const handleSelect = (selectedSymbol) => {
    navigate(`/stock/${selectedSymbol}`);
  };

  return (
    <div className="tradelab-container">
      <h2>Search Stock</h2>
      <form onSubmit={handleSubmit} className="stock-search-form" autoComplete="off">
        <input
          type="text"
          placeholder="Enter stock name or symbol (e.g. TCS)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((item) => (
            <li key={item.symbol} onClick={() => handleSelect(item.symbol)}>
              {item.name} ({item.symbol})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TradeLab;