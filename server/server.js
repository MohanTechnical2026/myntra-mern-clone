// This is the main entry point for our backend server.

// Load environment variables from .env file
require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Import all our route files
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const orderRoutes = require("./routes/orderRoutes");

// Connect to MongoDB
connectDB();

const app = express();

// Allow the React frontend (running on a different port) to call this API
app.use(cors());

// Allow the server to understand JSON request bodies
app.use(express.json());

// Serve the local-assets folder as static files.
// This means a file at "local-assets/images/men/shirt1.jpg" on disk
// becomes available at "http://localhost:5000/local-assets/images/men/shirt1.jpg"
app.use("/local-assets", express.static(path.join(__dirname, "..", "local-assets")));

// A simple test route to check if the server is running
app.get("/", (req, res) => {
    res.send("Myntra-inspired MERN API is running...");
});

// Connect all our API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);

// If someone hits a route that doesn't exist, or an error happens, handle it here
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
