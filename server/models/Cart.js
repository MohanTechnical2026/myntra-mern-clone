// Cart model - each user has ONE cart document that holds all their cart items.

const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    size: {
        type: String,
        default: "",
    },
    color: {
        type: String,
        default: "",
    },
    quantity: {
        type: Number,
        default: 1,
    },
});

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, // one cart per user
        },
        items: [cartItemSchema],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Cart", cartSchema);
