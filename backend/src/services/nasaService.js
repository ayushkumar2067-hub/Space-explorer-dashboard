const axios = require("axios");

const nasa = axios.create({

    baseURL: "https://api.nasa.gov",

    params: {

        api_key: process.env.NASA_API_KEY

    }

});

module.exports = nasa;