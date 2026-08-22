const express = require("express");
const router = express.Router();
const { getProfile, updateProfile, addAddress } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

// All routes here require the user to be logged in
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.post("/address", protect, addAddress);

module.exports = router;
