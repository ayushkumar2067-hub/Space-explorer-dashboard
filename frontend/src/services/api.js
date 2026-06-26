import axios from "axios";

// With the Vite proxy, /api/* is forwarded to http://localhost:5000/api/*
// so no absolute URL or port needed here.
const api = axios.create({
  baseURL: "/api",
  timeout: 15000,
});

export default api;