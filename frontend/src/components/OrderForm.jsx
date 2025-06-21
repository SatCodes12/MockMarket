import { useState } from "react";
import { getMarketStatus } from "../services/marketService";
import { getBalance, getStockHolding } from "../services/profileService";
import { buyOrder, sellOrder } from "../services/orderService";
import "./OrderForm.css";

function OrderForm({ symbol, currentPrice }) {
  const [quantity, setQuantity] = useState(0);

  async function isMarketOpen() {
    const { marketStatus, marketStatusMessage } = await getMarketStatus();
    return (
      marketStatus === "Open" &&
      /market is open/i.test(marketStatusMessage)
    );
  }

  async function buyCall(e) {
    e.preventDefault();

    if (!quantity || quantity <= 0 || !currentPrice) {
      alert("Enter a valid quantity and make sure price is available.");
      return;
    }

    const marketOpen = await isMarketOpen();
    if (!marketOpen) {
      alert("Market is currently closed. Please try again when the market is open.");
      return;
    }

    const totalCost = quantity * currentPrice;
    const { balance } = await getBalance();

    if (totalCost > balance) {
      alert(`Insufficient balance to place this order. Yor balance is ${balance}`);
      return;
    }

    const confirm = window.confirm(`Confirm Buy: ${quantity} shares of ${symbol} for ₹${totalCost.toFixed(2)}?`);
    if (!confirm) return;

    try {
      await buyOrder(symbol, quantity, currentPrice);
      alert("Buy order placed successfully.");
    } catch (error) {
      alert(error?.error || "Failed to place buy order.");
    }
  }

  async function sellCall(e) {
    e.preventDefault();

    if (!quantity || quantity <= 0 || !currentPrice) {
      alert("Enter a valid quantity and make sure price is available.");
      return;
    }

    const marketOpen = await isMarketOpen();
    if (!marketOpen) {
      alert("Market is currently closed. Please try again when the market is open.");
      return;
    }

    const holding = await getStockHolding(symbol);
    const ownedQty = holding?.quantity || 0;

    if (quantity > ownedQty) {
      alert(`You only own ${ownedQty} shares of ${symbol}.`);
      return;
    }

    const confirm = window.confirm(`Confirm Sell: ${quantity} shares of ${symbol} for ₹${(quantity * currentPrice).toFixed(2)}?`);
    if (!confirm) return;

    try {
      await sellOrder(symbol, quantity, currentPrice);
      alert("Sell order placed successfully.");
    } catch (error) {
      alert(error?.error || "Failed to place sell order.");
    }
  }

  return (
    <div className="order-form">
      <h3>Place Order</h3>
      <label htmlFor="quantity">Quantity</label>
      <input
        type="number"
        id="quantity"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        placeholder="Enter quantity"
      />

      <div className="order-buttons">
        <button className="buy-btn" onClick={buyCall}>Buy</button>
        <button className="sell-btn" onClick={sellCall}>Sell</button>
      </div>
    </div>
  );
}

export default OrderForm;