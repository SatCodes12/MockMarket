import "./PriceInfo.css";

export default function PriceInfo({ priceInfo }) {
  if (!priceInfo) return null;

  return (
    <div className="priceinfo-section">
      <h3>Price Info</h3>
      <ul>
        <li>
          <strong>Open:</strong> <span>{priceInfo["Open"] ?? "N/A"}</span>
        </li>
        <li>
          <strong>Day High:</strong> <span>{priceInfo["High"] ?? "N/A"}</span>
        </li>
        <li>
          <strong>Day Low:</strong> <span>{priceInfo["Low"] ?? "N/A"}</span>
        </li>
        <li>
          <strong>Previous Close:</strong> <span>{priceInfo["Previous Close"] ?? "N/A"}</span>
        </li>
      </ul>
    </div>
  );
}