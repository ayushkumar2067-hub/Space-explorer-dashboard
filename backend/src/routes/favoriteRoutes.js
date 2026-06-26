const express = require("express");

const router = express.Router();
console.log("Favorite Routes Loaded");
const {
    createFavorite,
    getFavorites
} = require("../controllers/favoriteController");

router.post("/", createFavorite);
router.get("/", getFavorites);

module.exports = router;