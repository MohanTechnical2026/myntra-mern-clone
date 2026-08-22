// WishlistItem - a single card in the Wishlist page, with a "Move to Bag" button.

import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import PriceDisplay from "./PriceDisplay";

const WishlistItem = ({ product }) => {
    const { removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleMoveToCart = async () => {
        // Add with no size/color selected - user can change it later in the cart/product page
        await addToCart(product._id, "", "", 1);
        await removeFromWishlist(product._id);
    };

    const imageSrc =
        product.images && product.images.length > 0
            ? product.images[0]
            : "/local-assets/images/placeholder.jpg";

    return (
        <div className="wishlist-item">
            <Link to={`/products/${product._id}`}>
                <img src={imageSrc} alt={product.name} className="wishlist-item-image" />
            </Link>

            <div className="wishlist-item-details">
                <p className="product-brand">{product.brand}</p>
                <p className="product-name">{product.name}</p>
                <PriceDisplay
                    price={product.price}
                    originalPrice={product.originalPrice}
                    discount={product.discount}
                />

                <div className="wishlist-item-actions">
                    <button className="btn-primary" onClick={handleMoveToCart}>
                        Move to Bag
                    </button>
                    <button
                        className="link-button"
                        onClick={() => removeFromWishlist(product._id)}
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WishlistItem;
