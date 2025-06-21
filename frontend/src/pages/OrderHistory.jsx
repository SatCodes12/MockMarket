import { useEffect, useState } from "react";
import { fetchOrderHistory } from "../services/orderService";
import OrderCard from "../components/OrderCard";
import "./OrderHistory.css";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrderHistory();
        setOrders(data);
      } catch (err) {
        setError(err.error || "Failed to load order history");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) return <p className="loading">Loading order history...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="order-history">
      <h2 className="order-history-title">Your Order History</h2>
      {orders.length === 0 ? (
        <p className="empty">No orders found.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}