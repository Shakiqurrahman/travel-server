const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const setToken = require("../utils/sendToken");

// signup a user
router.post("/signup", async (req, res, next) => {
    try {
        const { avatar, name, email } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return sendToken(user, 201, res);
        }
        const newUser = await User.create({
            avatar,
            name,
            email,
        });
        sendToken(newUser, 201, res);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});

// sign user
router.post("/signin", async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        setToken(user, 200, res);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});

// all users
router.get("/users", isAuthenticated, isAdmin, async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});

// user by email
router.get("/user/:email", isAuthenticated, async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});

// update user
router.put("/update-user/:email", isAuthenticated, async (req, res, next) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (!user) {
            throw new ErrorHandler("Something went wrong. Try again.", 400);
        }

        const { avatar, phone, address } = req.body;

        if (avatar) {
            user.avatar = avatar;
        }

        if (phone) {
            user.phone = phone;
        }

        if (address) {
            user.address = address;
        }

        await user.save();

        res.status(200).json({
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});

module.exports = router;
