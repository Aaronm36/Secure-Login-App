import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // backend URL
  withCredentials: true, // allow cookies
});

// Automatically attach JWT token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
