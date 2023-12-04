require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const connectDB = require("./utils/db");

app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import routes
const user = require("./controllers/userController");
const order = require("./controllers/orderController");
const review = require("./controllers/reviewController");
const payment = require("./controllers/paymentController");
const sendEmail = require("./controllers/sendMailcontroller");

app.use("/api", user);
app.use("/api", order);
app.use("/api", review);
app.use("/api", payment);
app.use("/api", sendEmail);

// testing routes
app.use("/", (req, res) => {
    res.send("Hello World");
});

// connect db
connectDB();

// create server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// error handler
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        details: err.message || "Internal Server Error",
    });
});

module.exports = app;
