const axios = require("axios");

const getAPOD = async (req, res) => {
    try {

        const response = await axios.get(
            `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
        );

        const {
            title,
            date,
            explanation,
            url,
            hdurl,
            media_type,
            copyright
        } = response.data;

        res.status(200).json({
            success: true,
            data: {
                title,
                date,
                explanation,
                url,
                hdurl,
                media_type,
                copyright
            }
        });

    } catch (error) {

        console.error("NASA API Error:", error.response?.data || error.message);

        res.status(500).json({
            success: false,
            message: "Failed to fetch APOD"
        });
    }
};

module.exports = {
    getAPOD
};