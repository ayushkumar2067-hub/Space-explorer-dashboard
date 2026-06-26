const express = require("express");
const router = express.Router();
const { getMarsPhotos, getRoverInfo } = require("../controllers/marsController");

router.get("/rovers", getRoverInfo);   // GET /api/mars/rovers
router.get("/", getMarsPhotos);        // GET /api/mars

module.exports = router;