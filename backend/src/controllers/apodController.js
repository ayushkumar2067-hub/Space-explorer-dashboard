const nasa = require("../services/nasaService");

/**
 * GET /api/apod
 * Query params:
 *   date       - YYYY-MM-DD  (optional, defaults to today)
 *   count      - number      (optional, returns N random APODs)
 *   thumbs     - boolean     (optional, include thumbnail for video APODs)
 */
const getAPOD = async (req, res, next) => {
    try {
        const { date, count, thumbs } = req.query;

        const params = {};
        if (date) params.date = date;
        if (count) params.count = parseInt(count, 10);
        if (thumbs) params.thumbs = thumbs === "true";

        const response = await nasa.get("/planetary/apod", { params });

        res.status(200).json({
            success: true,
            data: response.data,
        });
    } catch (error) {
        console.error("APOD Error:", error.response?.data || error.message);
        next(error);
    }
};

module.exports = { getAPOD };