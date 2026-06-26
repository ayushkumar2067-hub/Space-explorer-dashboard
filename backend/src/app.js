const express = require("express");

const app = express();

app.use(express.json());

const apodRoutes = require("./routes/apodRoutes");

app.get("/", (req, res) => {
    res.send("Welcome to Space Explorer Backend");
});

app.use("/api/apod", apodRoutes);

module.exports = app;
console.log("App Loaded");