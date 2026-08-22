// Product model - stores every item that shows up on the website
// (clothes, footwear, beauty products, accessories, home items, etc.)

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        // main category, e.g. "men", "women", "kids", "footwear", "beauty", "accessories", "home"
        category: {
            type: String,
            required: true,
        },
        // more specific category, e.g. "shirts", "jeans", "sneakers"
        subCategory: {
            type: String,
            default: "",
        },
        // "men", "women", "unisex", "kids" - used for gender filter
        gender: {
            type: String,
            default: "unisex",
        },
        price: {
            type: Number,
            required: true,
        },
        originalPrice: {
            type: Number,
            required: true,
        },
        // discount percentage, e.g. 20 means 20% off
        discount: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            default: "",
        },
        material: {
            type: String,
            default: "",
        },
        // available sizes, e.g. ["S", "M", "L", "XL"]
        sizes: {
            type: [String],
            default: [],
        },
        // available colors, e.g. ["Red", "Blue"]
        colors: {
            type: [String],
            default: [],
        },
        // paths to local images, e.g. "/local-assets/images/men/shirt1.jpg"
        images: {
            type: [String],
            default: [],
        },
        // paths to local product videos, e.g. "/local-assets/videos/men/shirt1-video.mp4"
        // optional - most products will just have images
        videos: {
            type: [String],
            default: [],
        },
        rating: {
            type: Number,
            default: 0,
        },
        reviews: {
            type: Number,
            default: 0,
        },
        stock: {
            type: Number,
            default: 10,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Product", productSchema);
