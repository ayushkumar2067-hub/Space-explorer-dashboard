const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    date: {
        type: String
    },

    imageUrl: {
        type: String,
        required: true
    },

    mediaType: {
        type: String,
        default: "image"
    },

    source: {
        type: String,
        enum: ["APOD", "MARS", "NEO"],
        required: true
    },

    notes: {
        type: String,
        default: ""
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Favorite", favoriteSchema);