// This file handles creating orders (checkout) and viewing order history.

const Order = require("../models/Order");
const Cart = require("../models/Cart");

// @route   POST /api/orders
// body: { address, paymentMethod }
// This reads the user's current cart, turns it into an order, then empties the cart.
const createOrder = async (req, res) => {
    try {
        const { address, paymentMethod } = req.body;

        const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Your cart is empty" });
        }

        // Build the products array for the order, and calculate the total
        let totalAmount = 0;
        const orderProducts = cart.items.map((item) => {
            totalAmount += item.product.price * item.quantity;
            return {
                product: item.product._id,
                name: item.product.name,
                price: item.product.price,
                size: item.size,
                color: item.color,
                quantity: item.quantity,
            };
        });

        // For this learning project, we simulate a successful payment
        // instead of connecting to a real payment gateway.
        const order = await Order.create({
            user: req.user.id,
            products: orderProducts,
            address,
            paymentMethod: paymentMethod || "COD",
            totalAmount,
            orderStatus: "Placed",
        });

        // Empty the cart after the order is placed
        cart.items = [];
        await cart.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   GET /api/orders
// Returns all orders for the logged-in user
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   GET /api/orders/:id
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Make sure users can only see their own orders
        if (order.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to view this order" });
        }

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: "Invalid order id" });
    }
};

module.exports = { createOrder, getMyOrders, getOrderById };
