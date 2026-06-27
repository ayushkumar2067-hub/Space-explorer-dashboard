import axios from "axios";

/**
 * Direct NASA API client — called from the browser.
 * NASA APIs support CORS so the browser can call them directly.
 */
const NASA_KEY = import.meta.env.VITE_NASA_API_KEY || "DEMO_KEY";

const nasaApi = axios.create({
  baseURL: "https://api.nasa.gov",
  timeout: 30000,
});

// Always attach the API key — do it in an interceptor so it
// is never lost when request-level `params` are passed.
nasaApi.interceptors.request.use((config) => {
  config.params = { api_key: NASA_KEY, ...(config.params || {}) };
  return config;
});

export default nasaApi;
