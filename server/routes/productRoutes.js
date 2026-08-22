const express = require("express");
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

// Anyone can view products (no login required for browsing)
router.get("/", getProducts);
router.get("/:id", getProductById);

// These would normally be protected/admin-only, but kept simple for this learning project
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
