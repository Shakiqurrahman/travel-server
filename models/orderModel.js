const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userInfo: {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
        },
        serviceInfo: {
            title: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
        paymentInfo: {
            status: {
                type: String,
                required: true,
            },
            transactionID: {
                type: String
            }
        },
        refundInfo: {
            status: {
                type:String,
                default: "completed"
            }
        },
        orderInfo: {
            date: {
                type: String,
                required: true,
            },
            numberOfPeople: {
                type: Number,
                required: true,
            },
            comments: {
                type: String,
            },
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

module.exports = mongoose.model("Order", orderSchema);
