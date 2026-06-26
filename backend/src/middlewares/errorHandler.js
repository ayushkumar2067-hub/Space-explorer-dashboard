/**
 * Global Express error-handling middleware.
 * Must be the LAST middleware registered in app.js (4 arguments).
 */
const errorHandler = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] ERROR:`, err.message);

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: messages,
        });
    }

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: `Invalid value for field: ${err.path}`,
        });
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Duplicate entry — this record already exists.",
        });
    }

    // Axios / NASA API errors
    if (err.response) {
        return res.status(err.response.status || 502).json({
            success: false,
            message: "Upstream API error",
            details: err.response.data,
        });
    }

    // Generic server error
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

module.exports = errorHandler;
