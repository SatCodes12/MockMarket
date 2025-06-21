import axios from "axios";

axios.defaults.withCredentials = true;

const BASE_URL = "http://localhost:3000/api/holding";

export async function getUserHoldings() {
    const res = await axios.get(`${BASE_URL}/`);
    return res.data;
}

export async function getTotalInvested() {
    const res = await axios.get(`${BASE_URL}/total`);
    return res.data;
}