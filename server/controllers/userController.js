// This file handles the logged-in user's profile.

const User = require("../models/User");

// @route   GET /api/users/profile
const getProfile = async (req, res) => {
    try {
        // req.user.id was attached by the authMiddleware after checking the token
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   PUT /api/users/profile
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Only update fields that were actually sent
        user.name = req.body.name || user.name;
        user.mobile = req.body.mobile || user.mobile;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            mobile: updatedUser.mobile,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   POST /api/users/address
// Adds a new saved address for the logged-in user
const addAddress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.addresses.push(req.body);
        await user.save();

        res.status(201).json(user.addresses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProfile, updateProfile, addAddress };
