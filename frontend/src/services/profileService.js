import axios from "axios";

axios.defaults.withCredentials = true;
const BASE_URL = "http://localhost:3000/api/profile";

export async function getProfile() {
    const res = await axios.get(`${BASE_URL}/`);
    return res.data;
}

export async function getBalance() {
    const res = await axios.get(`${BASE_URL}/balance`);
    return res.data;
}

export async function getStockHolding(symbol) {
    const res = await axios.get(`${BASE_URL}/stockholding/${symbol}`);
    return res.data;
}