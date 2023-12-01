const express = require("express");
const router = express.Router();
const Review = require("../models/reviewModel");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");

// create a review
router.post("/create-review", isAuthenticated, async (req, res, next) => {
    try {
        const { avatar, name, email, rating, review } = req.body;

        const isExist = await Review.findOne({ email });
        if (isExist) {
            return res.status(400).json({
                message: "You already reviewed.",
            });
        }
        const newReview = await Review.create({
            avatar,
            name,
            email,
            rating,
            review,
        });

        res.status(201).json({
            newReview,
            message: "Review submitted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});

// all users
router.get("/reviews", async (req, res, next) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});

// review by email
router.get("/review/:email", isAuthenticated, async (req, res, next) => {
    try {
        const review = await Review.findOne({ email: req.params.email });

        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});

module.exports = router;
