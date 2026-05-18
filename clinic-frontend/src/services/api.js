import axios from "axios";

const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const normalizedBaseUrl = rawBaseUrl.replace(/\/+$/, "");
const baseURL = normalizedBaseUrl.endsWith("/api")
  ? normalizedBaseUrl
  : `${normalizedBaseUrl}/api`;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;
