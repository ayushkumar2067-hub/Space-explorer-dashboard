const Favorite = require("../models/Favorite");

/**
 * POST /api/favorites
 * Creates a new favourite entry.
 */
const createFavorite = async (req, res, next) => {
    try {
        const { title, imageUrl, source } = req.body;

        // Basic field validation
        if (!title || !imageUrl || !source) {
            return res.status(400).json({
                success: false,
                message: "Fields 'title', 'imageUrl', and 'source' are required.",
            });
        }

        const favorite = await Favorite.create(req.body);

        res.status(201).json({
            success: true,
            data: favorite,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * GET /api/favorites
 * Returns all saved favourites, newest first.
 */
const getFavorites = async (req, res, next) => {
    try {
        const favorites = await Favorite.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: favorites.length,
            data: favorites,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * DELETE /api/favorites/:id
 * Removes a favourite by its MongoDB _id.
 */
const deleteFavorite = async (req, res, next) => {
    try {
        const favorite = await Favorite.findByIdAndDelete(req.params.id);

        if (!favorite) {
            return res.status(404).json({
                success: false,
                message: "Favourite not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Favourite deleted successfully.",
            data: favorite,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { createFavorite, getFavorites, deleteFavorite };
