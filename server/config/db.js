// This file is responsible for connecting our backend to MongoDB.
// We use Mongoose because it makes working with MongoDB much easier
// (it gives us schemas, models, and validation).

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // MONGO_URI comes from our .env file (see .env.example)
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        // If the database doesn't connect, there's no point running the server
        process.exit(1);
    }
};

module.exports = connectDB;
