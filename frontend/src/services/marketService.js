import axios from "axios";

axios.defaults.withCredentials = true;
const BASE_URL = "http://localhost:3000/api/market";

export async function getMarketStatus() {
    const res = await axios.get(`${BASE_URL}/status`);
    const data = res.data;

    if (data.marketState && data.marketState.length > 0) {
        const firstMarket = data.marketState[0];
        return {
            marketStatus: firstMarket.marketStatus,
            marketStatusMessage: firstMarket.marketStatusMessage
        };
    }

    return {
        marketStatus: null,
        marketStatusMessage: null
    };
}

export async function getIndices() {
    const res = await axios.get(`${BASE_URL}/indices`);
    return res.data;
}

export async function fetchStockDetails(symbol) {
    const res = await axios.get(`${BASE_URL}/stock/${symbol}`);
    return res.data;
}

export async function fetchStockPrice(symbol) {
    const res = await axios.get(`${BASE_URL}/stock/price/${symbol}`);
    return res.data;
}