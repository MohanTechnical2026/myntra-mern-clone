// Checkout page - address form + simulated payment method selection.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, fetchCart } = useCart();

    const [address, setAddress] = useState({
        name: "",
        mobile: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [placing, setPlacing] = useState(false);
    const [error, setError] = useState("");

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setError("");

        try {
            setPlacing(true);
            // For this learning project, payment is simulated - we just
            // create the order directly with the chosen payment method.
            const { data } = await api.post("/orders", { address, paymentMethod });
            await fetchCart(); // cart is now empty on the server, refresh it
            navigate(`/orders?placed=${data._id}`);
        } catch (err) {
            setError(err.response?.data?.message || "Could not place order. Please try again.");
        } finally {
            setPlacing(false);
        }
    };

    const items = cart.items || [];
    let totalAmount = 0;
    items.forEach((item) => {
        totalAmount += item.product.price * item.quantity;
    });

    if (items.length === 0) {
        return <p className="empty-state">Your bag is empty. Add products before checking out.</p>;
    }

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>

            <div className="checkout-layout">
                <form className="checkout-form" onSubmit={handlePlaceOrder}>
                    <h3>Delivery Address</h3>

                    {error && <p className="form-error">{error}</p>}

                    <label>Full Name</label>
                    <input name="name" value={address.name} onChange={handleAddressChange} required />

                    <label>Mobile Number</label>
                    <input
                        name="mobile"
                        value={address.mobile}
                        onChange={handleAddressChange}
                        required
                    />

                    <label>Address</label>
                    <textarea
                        name="address"
                        value={address.address}
                        onChange={handleAddressChange}
                        required
                    />

                    <div className="form-row">
                        <div>
                            <label>City</label>
                            <input name="city" value={address.city} onChange={handleAddressChange} required />
                        </div>
                        <div>
                            <label>State</label>
                            <input
                                name="state"
                                value={address.state}
                                onChange={handleAddressChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Pincode</label>
                            <input
                                name="pincode"
                                value={address.pincode}
                                onChange={handleAddressChange}
                                maxLength={6}
                                required
                            />
                        </div>
                    </div>

                    <h3>Payment Method</h3>
                    <div className="payment-options">
                        <label className="filter-option">
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "COD"}
                                onChange={() => setPaymentMethod("COD")}
                            />
                            Cash on Delivery
                        </label>
                        <label className="filter-option">
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "UPI"}
                                onChange={() => setPaymentMethod("UPI")}
                            />
                            UPI
                        </label>
                        <label className="filter-option">
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === "CARD"}
                                onChange={() => setPaymentMethod("CARD")}
                            />
                            Credit / Debit Card
                        </label>
                    </div>
                    <p className="note-text">
                        This is a learning project - no real payment will be processed. Placing the
                        order will simulate a successful payment.
                    </p>

                    <button type="submit" className="btn-primary" disabled={placing}>
                        {placing ? "Placing Order..." : `Place Order - ₹${totalAmount}`}
                    </button>
                </form>

                <div className="order-summary">
                    <h3>Order Summary</h3>
                    {items.map((item) => (
                        <div className="summary-row" key={item._id}>
                            <span>
                                {item.product.name} x {item.quantity}
                            </span>
                            <span>₹{item.product.price * item.quantity}</span>
                        </div>
                    ))}
                    <div className="summary-row total">
                        <span>Total</span>
                        <span>₹{totalAmount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
