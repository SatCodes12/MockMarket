import axios from "axios";

axios.defaults.withCredentials = true;

const BASE_URL = "http://localhost:3000/api/news";

export async function getNews() {
    const res = await axios.get(`${BASE_URL}/`);
    return res.data;
}
