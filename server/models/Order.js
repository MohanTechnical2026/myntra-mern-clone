// Order model - created after a user completes checkout.

const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    name: String, // storing name/price at time of order, in case product changes later
    price: Number,
    size: String,
    color: String,
    quantity: {
        type: Number,
        default: 1,
    },
});

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [orderItemSchema],
        address: {
            name: String,
            mobile: String,
            address: String,
            city: String,
            state: String,
            pincode: String,
        },
        paymentMethod: {
            type: String,
            enum: ["COD", "UPI", "CARD"],
            default: "COD",
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        orderStatus: {
            type: String,
            enum: ["Placed", "Confirmed", "Shipped", "Delivered", "Cancelled"],
            default: "Placed",
        },
    },
    {
        timestamps: true, // createdAt = order date
    }
);

module.exports = mongoose.model("Order", orderSchema);
