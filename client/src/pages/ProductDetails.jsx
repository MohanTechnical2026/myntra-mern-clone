// ProductDetails page - shows one product with image gallery, size/color/quantity
// selection, add to bag, buy now, wishlist, description, and a simple pincode check.

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Rating from "../components/Rating";
import PriceDisplay from "../components/PriceDisplay";
import ProductGallery from "../components/ProductGallery";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [pincode, setPincode] = useState("");
    const [deliveryMessage, setDeliveryMessage] = useState("");

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
                setSelectedSize(data.sizes && data.sizes.length > 0 ? data.sizes[0] : "");
                setSelectedColor(data.colors && data.colors.length > 0 ? data.colors[0] : "");
            } catch (error) {
                console.error("Failed to load product:", error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    const handleCheckDelivery = (e) => {
        e.preventDefault();
        if (pincode.trim().length !== 6) {
            setDeliveryMessage("Please enter a valid 6-digit pincode.");
            return;
        }
        // Simple simulated delivery estimate for a learning project
        setDeliveryMessage("Delivery available. Estimated in 3-5 business days.");
    };

    const handleAddToBag = async () => {
        if (!user) {
            navigate("/login");
            return;
        }
        await addToCart(product._id, selectedSize, selectedColor, quantity);
    };

    const handleBuyNow = async () => {
        if (!user) {
            navigate("/login");
            return;
        }
        await addToCart(product._id, selectedSize, selectedColor, quantity);
        navigate("/cart");
    };

    const handleWishlistToggle = async () => {
        if (!user) {
            navigate("/login");
            return;
        }
        if (isInWishlist(product._id)) {
            await removeFromWishlist(product._id);
        } else {
            await addToWishlist(product._id);
        }
    };

    if (loading) return <p className="loading-text">Loading product...</p>;
    if (!product) return <p className="empty-state">Product not found.</p>;

    return (
        <div className="product-details-page">
            <div className="product-details-layout">
                <ProductGallery
                    images={product.images}
                    videos={product.videos}
                    productName={product.name}
                />

                {/* Product Info */}
                <div className="product-details-info">
                    <p className="product-brand">{product.brand}</p>
                    <h1 className="product-name">{product.name}</h1>
                    <Rating value={product.rating} count={product.reviews} />
                    <PriceDisplay
                        price={product.price}
                        originalPrice={product.originalPrice}
                        discount={product.discount}
                    />

                    {product.sizes && product.sizes.length > 0 && (
                        <div className="option-group">
                            <h4>Select Size</h4>
                            <div className="option-list">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={selectedSize === size ? "option-btn active" : "option-btn"}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {product.colors && product.colors.length > 0 && (
                        <div className="option-group">
                            <h4>Select Color</h4>
                            <div className="option-list">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        className={selectedColor === color ? "option-btn active" : "option-btn"}
                                        onClick={() => setSelectedColor(color)}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="option-group">
                        <h4>Quantity</h4>
                        <div className="quantity-control">
                            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button className="btn-primary" onClick={handleAddToBag}>
                            Add to Bag
                        </button>
                        <button className="btn-secondary" onClick={handleBuyNow}>
                            Buy Now
                        </button>
                        <button className="btn-outline" onClick={handleWishlistToggle}>
                            {isInWishlist(product._id) ? "Remove from Wishlist" : "♥ Wishlist"}
                        </button>
                    </div>

                    <div className="delivery-check">
                        <h4>Check Delivery</h4>
                        <form onSubmit={handleCheckDelivery} className="pincode-form">
                            <input
                                type="text"
                                placeholder="Enter pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                maxLength={6}
                            />
                            <button type="submit">Check</button>
                        </form>
                        {deliveryMessage && <p className="delivery-message">{deliveryMessage}</p>}
                    </div>

                    <div className="product-description">
                        <h4>Product Details</h4>
                        <p>{product.description || "No description available."}</p>
                        {product.material && (
                            <p>
                                <strong>Material:</strong> {product.material}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
