import axios from "axios";

axios.defaults.withCredentials = true;
const BASE_URL = "http://localhost:3000/api/order";

export async function buyOrder(symbol, quantity, currentPrice) {
    try {
        const res = await axios.post(`${BASE_URL}/buy`, {
            symbol: symbol,
            currPrice: currentPrice,
            qty: quantity
        });
        return res.data;
    } catch (error) {
        console.error("Error placing buy order:", error);
        throw error.response?.data || { error: "Buy order failed" };
    }
}

export async function sellOrder(symbol, quantity, currentPrice) {
    try {
        const res = await axios.post(`${BASE_URL}/sell`, {
            symbol: symbol,
            currPrice: currentPrice,
            qty: quantity
        });
        return res.data;
    } catch (error) {
        console.error("Error placing sell order:", error);
        throw error.response?.data || { error: "Sell order failed" };
    }
}

export async function fetchOrderHistory() {
    try {
        const res = await axios.get(`${BASE_URL}/history`);
        return res.data;
    } catch (error) {
        console.error("Error fetching order history:", error);
        throw error.response?.data || { error: "Cannot fetch order history" };
    }
}