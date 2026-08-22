// Cart page - shows all items in the bag plus an order summary.

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

const Cart = () => {
    const { cart, loading } = useCart();

    if (loading) return <p className="loading-text">Loading your bag...</p>;

    const items = cart.items || [];

    if (items.length === 0) {
        return (
            <div className="empty-state">
                <p>Your bag is empty.</p>
                <Link to="/products" className="btn-primary">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    // Calculate order summary values
    let totalMRP = 0;
    let totalDiscount = 0;

    items.forEach((item) => {
        totalMRP += item.product.originalPrice * item.quantity;
        totalDiscount += (item.product.originalPrice - item.product.price) * item.quantity;
    });

    const deliveryFee = totalMRP > 999 ? 0 : 99;
    const finalTotal = totalMRP - totalDiscount + deliveryFee;

    return (
        <div className="cart-page">
            <h2>My Bag ({items.length})</h2>

            <div className="cart-layout">
                <div className="cart-items-list">
                    {items.map((item) => (
                        <CartItem key={item._id} item={item} />
                    ))}
                </div>

                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                        <span>Total MRP</span>
                        <span>₹{totalMRP}</span>
                    </div>
                    <div className="summary-row">
                        <span>Discount</span>
                        <span>- ₹{totalDiscount}</span>
                    </div>
                    <div className="summary-row">
                        <span>Delivery Fee</span>
                        <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total Amount</span>
                        <span>₹{finalTotal}</span>
                    </div>

                    <Link to="/checkout" className="btn-primary checkout-btn">
                        Place Order
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
