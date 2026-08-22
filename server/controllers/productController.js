// This file handles everything related to products:
// listing (with filters/sort/search), getting one product, and basic admin CRUD.

const Product = require("../models/Product");

// @route   GET /api/products
// Supports query params like:
// /api/products?category=men&gender=men&sort=priceLowToHigh&search=shirt
const getProducts = async (req, res) => {
    try {
        const { category, subCategory, gender, brand, size, color, search, sort } = req.query;

        // Build a MongoDB filter object step by step, in plain simple code
        const filter = {};

        if (category) filter.category = category;
        if (subCategory) filter.subCategory = subCategory;
        if (gender) filter.gender = gender;
        if (brand) filter.brand = brand;
        if (size) filter.sizes = size; // matches if "size" exists in the sizes array
        if (color) filter.colors = color;

        // Simple price range filter: ?minPrice=500&maxPrice=2000
        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};
            if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
            if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
        }

        // Simple search across name, brand, and category
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { brand: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
            ];
        }

        // Build the sort option
        let sortOption = {};
        if (sort === "priceLowToHigh") sortOption = { price: 1 };
        else if (sort === "priceHighToLow") sortOption = { price: -1 };
        else if (sort === "rating") sortOption = { rating: -1 };
        else if (sort === "discount") sortOption = { discount: -1 };
        else sortOption = { createdAt: -1 }; // "recommended" = newest first

        const products = await Product.find(filter).sort(sortOption);

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   GET /api/products/:id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        // This usually happens if the id format is invalid
        res.status(400).json({ message: "Invalid product id" });
    }
};

// @route   POST /api/products
// Simple admin-style route for adding a product (no separate admin panel for this learning project)
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // return the updated document
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product removed" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @route   GET /api/categories
// Returns the list of distinct categories currently in the database
const getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct("category");
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getCategories,
};
