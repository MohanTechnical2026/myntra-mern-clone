// This file handles the logged-in user's wishlist.

const Wishlist = require("../models/Wishlist");

// @route   GET /api/wishlist
const getWishlist = async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ user: req.user.id }).populate("products");

        if (!wishlist) {
            return res.json({ user: req.user.id, products: [] });
        }

        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   POST /api/wishlist
// body: { productId }
const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;

        let wishlist = await Wishlist.findOne({ user: req.user.id });

        if (!wishlist) {
            wishlist = await Wishlist.create({ user: req.user.id, products: [] });
        }

        // Only add if it's not already in the wishlist
        const alreadyInWishlist = wishlist.products.some((p) => p.toString() === productId);

        if (!alreadyInWishlist) {
            wishlist.products.push(productId);
            await wishlist.save();
        }

        await wishlist.populate("products");

        res.status(201).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   DELETE /api/wishlist/:productId
const removeFromWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user.id });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        wishlist.products = wishlist.products.filter(
            (p) => p.toString() !== req.params.productId
        );

        await wishlist.save();
        await wishlist.populate("products");

        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getWishlist, addToWishlist, removeFromWishlist };
