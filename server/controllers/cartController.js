// This file handles the logged-in user's shopping bag / cart.

const Cart = require("../models/Cart");

// @route   GET /api/cart
const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

        // If the user doesn't have a cart yet, just return an empty one
        if (!cart) {
            return res.json({ user: req.user.id, items: [] });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   POST /api/cart
// body: { productId, size, color, quantity }
const addToCart = async (req, res) => {
    try {
        const { productId, size, color, quantity } = req.body;

        let cart = await Cart.findOne({ user: req.user.id });

        // If user has no cart yet, create one
        if (!cart) {
            cart = await Cart.create({ user: req.user.id, items: [] });
        }

        // Check if this exact product + size + color is already in the cart
        const existingItem = cart.items.find(
            (item) =>
                item.product.toString() === productId &&
                item.size === size &&
                item.color === color
        );

        if (existingItem) {
            // Already in cart, just increase the quantity
            existingItem.quantity += quantity || 1;
        } else {
            cart.items.push({
                product: productId,
                size,
                color,
                quantity: quantity || 1,
            });
        }

        await cart.save();
        await cart.populate("items.product");

        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   PUT /api/cart/:itemId
// body: { quantity }  -> used for increase/decrease quantity buttons
const updateCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.id(req.params.itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        item.quantity = req.body.quantity;

        await cart.save();
        await cart.populate("items.product");

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   DELETE /api/cart/:itemId
const removeCartItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter((item) => item._id.toString() !== req.params.itemId);

        await cart.save();
        await cart.populate("items.product");

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCart, addToCart, updateCartItem, removeCartItem };
