import { useNavigate } from "react-router-dom";
import "./OrderCard.css";

function OrderCard({ order }) {
  const navigate = useNavigate();
  const {
    company_symbol,
    company_name,
    type,
    price,
    quantity,
    timestamp
  } = order;

  const formattedDate = new Date(timestamp).toLocaleString("en-GB");
  const tradePrice = parseFloat(price).toFixed(2);

  return (
    <div className="order-card" onClick={() => navigate(`/stock/${company_symbol}`)}>
      <h3 className="order-name-symbol">{company_name} ({company_symbol})</h3>
      <div className="order-row">
        <p><strong>Trade Amount: </strong><span>₹{(quantity * tradePrice).toFixed(2)}</span></p>
      </div>
      <div className="order-row">
        <p><strong>Quantity:</strong> <span>{quantity}</span></p>
        <p className={`order-type ${type.toLowerCase()}`}>
          <strong>Order type:</strong> <span>{type.toUpperCase()}</span>
        </p>
      </div>
      <div className="order-row">
        <p><strong>Price:</strong> <span>₹{tradePrice}</span></p>
        <p className="order-date"><em>{formattedDate}</em></p>
      </div>
    </div>
  );
}

export default OrderCard;