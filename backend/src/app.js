const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to Space Explorer Backend");
});

module.exports = app;