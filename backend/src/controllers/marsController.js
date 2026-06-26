const nasa = require("../services/nasaService");

const VALID_ROVERS = ["curiosity", "opportunity", "spirit", "perseverance"];

// Active date ranges for each rover
const ROVER_DATE_RANGES = {
    curiosity:     { min: "2012-08-06", max: null },   // still active
    perseverance:  { min: "2021-02-18", max: null },   // still active
    opportunity:   { min: "2004-01-25", max: "2018-06-10" },
    spirit:        { min: "2004-01-04", max: "2010-03-21" },
};

/**
 * GET /api/mars
 * Query params:
 *   rover      - curiosity | opportunity | spirit | perseverance (default: curiosity)
 *   earth_date - YYYY-MM-DD  (used if sol not provided, default: 2020-07-01)
 *   sol        - Martian sol number (takes priority over earth_date if provided)
 *   camera     - camera abbreviation (optional)
 *   page       - page number for pagination (default: 1)
 */
const getMarsPhotos = async (req, res, next) => {
    try {
        const {
            rover = "curiosity",
            earth_date,
            sol,
            camera,
            page = 1,
        } = req.query;

        const roverKey = rover.toLowerCase();

        // Validate rover name
        if (!VALID_ROVERS.includes(roverKey)) {
            return res.status(400).json({
                success: false,
                message: `Invalid rover. Must be one of: ${VALID_ROVERS.join(", ")}`,
            });
        }

        const range = ROVER_DATE_RANGES[roverKey];
        const today = new Date().toISOString().split("T")[0];

        // Determine the date to use
        let resolvedDate = earth_date;
        if (!resolvedDate && !sol) {
            // Pick a sensible default inside the rover's active window
            resolvedDate = range.max || "2020-07-01";
        }

        // Validate earth_date falls within the rover's active window
        if (resolvedDate && !sol) {
            const maxDate = range.max || today;
            if (resolvedDate < range.min || resolvedDate > maxDate) {
                return res.status(400).json({
                    success: false,
                    message: `The ${rover} rover was only active between ${range.min} and ${range.max || "today"}. Please choose a date in that range.`,
                });
            }
        }

        const params = { page };
        if (sol) {
            params.sol = parseInt(sol, 10);
        } else {
            params.earth_date = resolvedDate;
        }
        if (camera) params.camera = camera.toUpperCase();

        const response = await nasa.get(
            `/mars-photos/api/v1/rovers/${roverKey}/photos`,
            { params }
        );

        const photos = response.data.photos;

        res.status(200).json({
            success: true,
            rover: roverKey,
            count: photos.length,
            page: parseInt(page, 10),
            activeRange: range,
            photos,
        });
    } catch (error) {
        console.error("Mars Error:", error.response?.data || error.message);
        next(error);
    }
};

/**
 * GET /api/mars/rovers
 * Returns metadata (active date ranges) for all rovers.
 */
const getRoverInfo = (req, res) => {
    res.status(200).json({
        success: true,
        rovers: Object.entries(ROVER_DATE_RANGES).map(([name, range]) => ({
            name,
            minDate: range.min,
            maxDate: range.max || new Date().toISOString().split("T")[0],
            active: range.max === null,
        })),
    });
};

module.exports = { getMarsPhotos, getRoverInfo };