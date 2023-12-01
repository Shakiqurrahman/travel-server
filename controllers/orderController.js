const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const sendEmailWithNodeMailer = require("./sendMailcontroller");

// create an order
router.post("/create-order", isAuthenticated, async (req, res, next) => {
    try {
        const data = req.body;

        const newOrder = await Order.create(data);

        const emailData = {
            email: data.userInfo.email,
            subject: 'Order Confirmation Email',
            html: `
                <h2>Hello ${data.userInfo.name} !</h2>
                <h3>Your Destination : ${data.serviceInfo.title}</h3>
                <p>Journey Date : ${data.orderInfo.date}</p>
                <p>Number of Person : ${data.orderInfo.numberOfPeople}</p>
                <p>You have paid ${data.serviceInfo.price}usd  and Your transaction id : ${data.paymentInfo.transactionID}</p>
                <h3>Happy Journey !</h3>
                `
        }

        await sendEmailWithNodeMailer(emailData)
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});

// all orders
router.get("/orders", isAuthenticated, isAdmin, async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});

// order by email
router.get("/order/:email", isAuthenticated, async (req, res, next) => {
    try {
        const order = await Order.find({ "userInfo.email": req.params.email });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
});



router.put("/orders/update-order", isAuthenticated, async (req, res, next) => {
    const { orderId, refundStatus } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { $set: { "refundInfo.status": refundStatus } },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});



module.exports = router;
