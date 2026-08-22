// Wishlist page - shows all wishlisted products.

import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import WishlistItem from "../components/WishlistItem";

const Wishlist = () => {
    const { wishlist } = useWishlist();
    const products = wishlist.products || [];

    if (products.length === 0) {
        return (
            <div className="empty-state">
                <p>Your wishlist is empty.</p>
                <Link to="/products" className="btn-primary">
                    Discover Products
                </Link>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <h2>My Wishlist ({products.length})</h2>
            <div className="wishlist-grid">
                {products.map((product) => (
                    <WishlistItem key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
