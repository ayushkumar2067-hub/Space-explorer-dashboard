const axios = require("axios");

/**
 * Pre-configured Axios instance for NASA APIs.
 * Automatically attaches the API key to every request.
 */
const nasaService = axios.create({
    baseURL: "https://api.nasa.gov",
    timeout: 30000,  // 30s — NASA API can be slow
    params: {
        api_key: process.env.NASA_API_KEY || "DEMO_KEY",
    },
    headers: {
        Accept: "application/json",
    },
});

// Log outgoing requests in dev
nasaService.interceptors.request.use((config) => {
    console.log(`[NASA] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
});

module.exports = nasaService;
