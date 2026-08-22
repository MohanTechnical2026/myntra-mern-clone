// CartItem - a single row in the Cart page.

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    const { addToWishlist } = useWishlist();

    const product = item.product;

    const increaseQuantity = () => {
        updateQuantity(item._id, item.quantity + 1);
    };

    const decreaseQuantity = () => {
        if (item.quantity > 1) {
            updateQuantity(item._id, item.quantity - 1);
        }
    };

    const handleMoveToWishlist = async () => {
        await addToWishlist(product._id);
        await removeFromCart(item._id);
    };

    const imageSrc =
        product.images && product.images.length > 0
            ? product.images[0]
            : "/local-assets/images/placeholder.jpg";

    return (
        <div className="cart-item">
            <img src={imageSrc} alt={product.name} className="cart-item-image" />

            <div className="cart-item-details">
                <p className="product-brand">{product.brand}</p>
                <p className="product-name">{product.name}</p>
                <p className="cart-item-meta">
                    Size: {item.size || "-"} | Color: {item.color || "-"}
                </p>

                <div className="cart-item-price">
                    <span className="current-price">₹{product.price}</span>
                    {product.originalPrice > product.price && (
                        <span className="original-price">₹{product.originalPrice}</span>
                    )}
                </div>

                <div className="quantity-control">
                    <button onClick={decreaseQuantity}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={increaseQuantity}>+</button>
                </div>

                <div className="cart-item-actions">
                    <button className="link-button" onClick={handleMoveToWishlist}>
                        Move to Wishlist
                    </button>
                    <button className="link-button" onClick={() => removeFromCart(item._id)}>
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
