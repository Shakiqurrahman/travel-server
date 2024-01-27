const express = require("express");
const sendEmailWithNodeMailer = require("../utils/email");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.post("/send-email", isAuthenticated, async (req, res, next) => {
    try {
        const data = req.body;

        const emailData = {
            email: data.userInfo.email,
            subject: 'Order Confirmation Email',
            html: `
                <h2>Hello ${data.userInfo.name} !</h2>
                <h3>Your Destination : ${data.serviceInfo.title}</h3>
                <p>Journey Date : ${data.orderInfo.date}</p>
                <p>Number of Person : ${data.orderInfo.numberOfPeople}</p>
                <p>You have paid ${data.serviceInfo.price} usd  and Your transaction id : ${data.paymentInfo.transactionID}</p>
                <h3>Happy Journey !</h3>
                `
        }

        await sendEmailWithNodeMailer(emailData)
        res.status(201).json({
            message:"Email has been sent."
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});

module.exports = router