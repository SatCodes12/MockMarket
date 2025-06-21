import "./PriceTicker.css";

function PriceTicker({ name, price, close }) {
  const percentageChange = price != null && close != null && close !== 0
    ? ((price - close) / close) * 100
    : null;

  const formattedChange =
    percentageChange != null
      ? `${percentageChange.toFixed(2)}%`
      : "N/A";

  const changeClass = percentageChange > 0
    ? "positive" : percentageChange < 0
      ? "negative"
      : "neutral";

  return (
    <div className="ticker">
      <div className="name">{name}</div>
      <div className="price">{price != null ? `${price}` : "N/A"}</div>
      <div className={`change ${changeClass}`}>{formattedChange}</div>
    </div>
  );
}

export default PriceTicker;