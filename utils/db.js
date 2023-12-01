const mongoose = require("mongoose");

const dbUrl = process.env.MONGO_LINK || "";

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl).then(() => {
            console.log("Connected to MongoDB");
        });
    } catch (error) {
        console.log(error.message);
        setTimeout(connectDB, 5000);
    }
};

module.exports = connectDB;
