require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
    {
        avatar: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        role: {
            type: String,
            default: "user",
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

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000,
    });
};

module.exports = mongoose.model("User", userSchema);
