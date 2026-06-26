const axios = require("axios");

const getMarsPhotos = async (req, res) => {

    try {

        const rover = req.query.rover || "curiosity";

        const earth_date = req.query.earth_date || "2020-07-01";

        const url =
`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`;

        const response = await axios.get(url, {

            params: {

                earth_date,

                api_key: process.env.NASA_API_KEY

            }

        });

        res.status(200).json({

            success: true,

            count: response.data.photos.length,

            photos: response.data.photos

        });

    }

    catch(error){

        console.error("Status:", error.response?.status);
    console.error("NASA Error:", error.response?.data);
    console.error("Message:", error.message);

    res.status(500).json({
        success: false,
        message: "Failed to fetch Mars Rover photos"
    });

    }

};

module.exports = {

    getMarsPhotos

};