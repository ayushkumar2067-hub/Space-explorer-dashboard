const Favorite = require("../models/Favorite");

const createFavorite = async (req, res) => {
    try {
        const favorite = await Favorite.create(req.body);

        res.status(201).json({
            success: true,
            data: favorite
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite.find();

        res.status(200).json({
            success: true,
            count: favorites.length,
            data: favorites
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createFavorite,
    getFavorites
};

