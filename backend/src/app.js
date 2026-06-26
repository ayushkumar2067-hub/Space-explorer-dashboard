const express = require("express");

const app = express();

app.use(express.json());

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