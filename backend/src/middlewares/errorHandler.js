/**
 * Global Express error-handling middleware.
 * Must be the LAST middleware registered in app.js (4 arguments).
 */

// Detect if a value looks like HTML (not JSON)
const isHTML = (str) =>
    typeof str === "string" && str.trimStart().startsWith("<");

const errorHandler = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] ERROR:`, err.message);

    // ── Mongoose: validation error ───────────────────────────────────────────
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: messages,
        });
    }

    // ── Mongoose: bad ObjectId ───────────────────────────────────────────────
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: `Invalid ID format for field: ${err.path}`,
        });
    }

    // ── Mongoose: duplicate key ──────────────────────────────────────────────
    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: "Duplicate entry — this record already exists.",
        });
    }

    // ── Axios: timeout / network unreachable ─────────────────────────────────
    if (
        err.code === "ECONNABORTED" ||
        err.code === "ETIMEDOUT" ||
        err.code === "ENOTFOUND" ||
        err.code === "ECONNREFUSED" ||
        err.message?.toLowerCase().includes("timeout")
    ) {
        return res.status(504).json({
            success: false,
            message:
                "Could not reach the NASA API. Check your internet connection or try again in a moment.",
        });
    }

    // ── Axios: got a response back from NASA ─────────────────────────────────
    if (err.response) {
        const data = err.response.data;

        // If NASA returned HTML (e.g. a Heroku error page) instead of JSON,
        // don't expose it — return a clean message instead.
        if (isHTML(data)) {
            return res.status(502).json({
                success: false,
                message:
                    `NASA API returned an unexpected response (HTTP ${err.response.status}). ` +
                    "This usually means the endpoint is temporarily unavailable. Please try again.",
            });
        }

        // Extract the actual NASA error message from JSON
        const nasaMsg =
            data?.error?.message ||
            data?.msg ||
            data?.message ||
            data?.errors?.[0] ||
            `NASA API error (HTTP ${err.response.status})`;

        return res.status(err.response.status || 502).json({
            success: false,
            message: nasaMsg,
        });
    }

    // ── Generic server error ─────────────────────────────────────────────────
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

module.exports = errorHandler;
