const axios = require("axios");

/**
 * Pre-configured Axios instance for NASA APIs.
 * Automatically attaches the API key to every request.
 */
const nasaService = axios.create({
    baseURL: "https://api.nasa.gov",
    timeout: 10000,
    params: {
        api_key: process.env.NASA_API_KEY,
    },
});

module.exports = nasaService;
