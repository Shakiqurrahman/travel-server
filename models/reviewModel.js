const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        avatar: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        review: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    {
        versionKey: false,
    },
);

module.exports = mongoose.model("Review", reviewSchema);
