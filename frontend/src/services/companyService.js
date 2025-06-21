import axios from "axios";
axios.defaults.withCredentials = true;
const BASE_URL = "http://localhost:3000/api";

export async function searchCompanies (query) {
    const res = await axios.get(`${BASE_URL}/companies/search`, {
        params: { query },
    });
    return res.data;
};