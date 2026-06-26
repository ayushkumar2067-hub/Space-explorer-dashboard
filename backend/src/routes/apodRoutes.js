const express = require("express");

const router = express.Router();

const { getAPOD } = require("../controllers/apodController");

router.get("/", getAPOD);

module.exports = router;
console.log("APOD Routes Loaded");