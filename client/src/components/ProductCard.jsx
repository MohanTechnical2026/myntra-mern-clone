// ProductCard - the small card used in product grids across the site.

import { Link } from "react-router-dom";
import Rating from "./Rating";
import PriceDisplay from "./PriceDisplay";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const { user } = useAuth();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const navigate = useNavigate();

    const inWishlist = isInWishlist(product._id);

    const handleWishlistClick = async (e) => {
        e.preventDefault(); // stop the click from navigating to product details
        e.stopPropagation();

        if (!user) {
            navigate("/login");
            return;
        }

        if (inWishlist) {
            await removeFromWishlist(product._id);
        } else {
            await addToWishlist(product._id);
        }
    };

    // Use a simple placeholder image path if no local image was added yet
    const imageSrc =
        product.images && product.images.length > 0
            ? product.images[0]
            : "/local-assets/images/placeholder.jpg";

    return (
        <Link to={`/products/${product._id}`} className="product-card">
            <div className="product-image-wrapper">
                <img src={imageSrc} alt={product.name} className="product-image" />
                <button
                    className={`wishlist-btn ${inWishlist ? "active" : ""}`}
                    onClick={handleWishlistClick}
                    aria-label="Toggle wishlist"
                >
                    ♥
                </button>
            </div>

            <div className="product-info">
                <p className="product-brand">{product.brand}</p>
                <p className="product-name">{product.name}</p>
                <PriceDisplay
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                />
                <Rating value={product.rating} count={product.reviews} />
            </div>
        </Link>
    );
};

export default ProductCard;
