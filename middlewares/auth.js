const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized Access",
            });
        }

        const decodedData = jwt.verify(token, process.env.TOKEN_SECRET);

        req.user = await User.findById(decodedData.id);

        next();
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
};

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(401).json({
                message: "Access Denied",
            });
        }

        next();
    } catch (error) {
        res.status(error.statusCode).json({
            message: error.message,
        });
    }
};
