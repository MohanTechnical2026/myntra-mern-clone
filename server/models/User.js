// User model - stores account info for people who register on our site.

const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    name: String,
    mobile: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
});

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // no two users can have the same email
        },
        password: {
            type: String,
            required: true, // this will be stored as a bcrypt hash, never plain text
        },
        mobile: {
            type: String,
            default: "",
        },
        // A user can save multiple addresses for checkout
        addresses: [addressSchema],
    },
    {
        timestamps: true, // adds createdAt and updatedAt automatically
    }
);

module.exports = mongoose.model("User", userSchema);
