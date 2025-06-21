import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";

export const checkAuth = async () => {
  const res = await axios.get("/api/auth/check", { withCredentials: true });
  return res.data.user;
};

export const loginUser = async (formData) => {
  await axios.post("/api/auth/login", formData, { withCredentials: true });
  return checkAuth();
};

export const registerUser = async (formData) => {
  await axios.post("/api/auth/register", formData, { withCredentials: true });
  return checkAuth();
};

export const logoutUser = async () => {
  await axios.get("/api/auth/logout", { withCredentials: true });
};