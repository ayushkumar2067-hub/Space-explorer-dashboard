const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

const apodRoutes = require("./routes/apodRoutes");
const marsRoutes = require("./routes/marsRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();

// ── CORS ─────────────────────────────────────────────────────────────────────
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "http://localhost:5173",
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// ── Home ──────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.send("🚀 Welcome to the Space Explorer Backend");
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use("/api/apod", apodRoutes);
app.use("/api/mars", marsRoutes);
app.use("/api/favorites", favoriteRoutes);

// ── 404 handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found." });
});

// ── Global error handler (must be last) ───────────────────────────────────────
app.use(errorHandler);

module.exports = app;