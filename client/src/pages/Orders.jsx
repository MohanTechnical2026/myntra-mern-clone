// Orders page - "My Orders" list showing order id, products, amount, date, status.

import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../services/api";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const justPlacedId = searchParams.get("placed");

    useEffect(() => {
        const loadOrders = async () => {
            try {
                setLoading(true);
                const { data } = await api.get("/orders");
                setOrders(data);
            } catch (error) {
                console.error("Failed to load orders:", error.message);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    if (loading) return <p className="loading-text">Loading your orders...</p>;

    if (orders.length === 0) {
        return (
            <div className="empty-state">
                <p>You haven't placed any orders yet.</p>
                <Link to="/products" className="btn-primary">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <h2>My Orders</h2>

            {justPlacedId && (
                <p className="success-message">
                    Your order was placed successfully! Order ID: {justPlacedId}
                </p>
            )}

            <div className="orders-list">
                {orders.map((order) => (
                    <div className="order-card" key={order._id}>
                        <div className="order-card-header">
                            <div>
                                <p className="order-id">Order ID: {order._id}</p>
                                <p className="order-date">
                                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <span className={`order-status status-${order.orderStatus.toLowerCase()}`}>
                                {order.orderStatus}
                            </span>
                        </div>

                        <div className="order-products">
                            {order.products.map((item, index) => (
                                <p key={index}>
                                    {item.name} (x{item.quantity}) - ₹{item.price * item.quantity}
                                </p>
                            ))}
                        </div>

                        <div className="order-card-footer">
                            <span>Total: ₹{order.totalAmount}</span>
                            <span>Payment: {order.paymentMethod}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
