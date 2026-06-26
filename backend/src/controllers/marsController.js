const nasa = require("../services/nasaService");

const VALID_ROVERS = ["curiosity", "opportunity", "spirit", "perseverance"];

/**
 * GET /api/mars
 * Query params:
 *   rover      - curiosity | opportunity | spirit | perseverance (default: curiosity)
 *   earth_date - YYYY-MM-DD  (used if sol not provided, default: 2020-07-01)
 *   sol        - Martian sol number (takes priority over earth_date if provided)
 *   camera     - FHAZ | RHAZ | MAST | CHEMCAM | MAHLI | MARDI | NAVCAM | PANCAM | MINITES (optional)
 *   page       - page number for pagination (default: 1)
 */
const getMarsPhotos = async (req, res, next) => {
    try {
        const {
            rover = "curiosity",
            earth_date = "2020-07-01",
            sol,
            camera,
            page = 1,
        } = req.query;

        // Validate rover name
        if (!VALID_ROVERS.includes(rover.toLowerCase())) {
            return res.status(400).json({
                success: false,
                message: `Invalid rover. Must be one of: ${VALID_ROVERS.join(", ")}`,
            });
        }

        const params = { page };

        // sol takes priority over earth_date
        if (sol) {
            params.sol = parseInt(sol, 10);
        } else {
            params.earth_date = earth_date;
        }

        if (camera) params.camera = camera.toUpperCase();

        const response = await nasa.get(
            `/mars-photos/api/v1/rovers/${rover.toLowerCase()}/photos`,
            { params }
        );

        const photos = response.data.photos;

        res.status(200).json({
            success: true,
            rover: rover.toLowerCase(),
            count: photos.length,
            page: parseInt(page, 10),
            photos,
        });
    } catch (error) {
        console.error("Mars Error:", error.response?.data || error.message);
        next(error);
    }
};

module.exports = { getMarsPhotos };