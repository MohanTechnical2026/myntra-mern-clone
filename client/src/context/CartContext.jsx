// CartContext keeps the shopping bag in sync across the whole app
// (Header bag count, Cart page, Product Details "Add to Bag" button, etc.)

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(false);

    // Load the cart whenever the user logs in
    const fetchCart = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const { data } = await api.get("/cart");
            setCart(data);
        } catch (error) {
            console.error("Failed to load cart:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart({ items: [] }); // clear cart when logged out
        }
    }, [user]);

    const addToCart = async (productId, size, color, quantity = 1) => {
        const { data } = await api.post("/cart", { productId, size, color, quantity });
        setCart(data);
    };

    const updateQuantity = async (itemId, quantity) => {
        const { data } = await api.put(`/cart/${itemId}`, { quantity });
        setCart(data);
    };

    const removeFromCart = async (itemId) => {
        const { data } = await api.delete(`/cart/${itemId}`);
        setCart(data);
    };

    return (
        <CartContext.Provider
            value={{ cart, loading, addToCart, updateQuantity, removeFromCart, fetchCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
