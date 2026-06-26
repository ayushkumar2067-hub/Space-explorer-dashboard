const express = require("express");
const favoriteRoutes = require("./routes/favoriteRoutes");

const app = express();

app.use(express.json());
app.use("/api/favorites", favoriteRoutes);

// Import routes
const apodRoutes = require("./routes/apodRoutes");
const marsRoutes = require("./routes/marsRoutes");

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to Space Explorer Backend");
});

// Register routes
app.use("/api/apod", apodRoutes);
app.use("/api/mars", marsRoutes);

console.log("App Loaded");

module.exports = app;