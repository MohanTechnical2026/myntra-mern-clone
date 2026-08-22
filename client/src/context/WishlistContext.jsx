// WishlistContext keeps the wishlist in sync across the whole app,
// similar to CartContext.

import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState({ products: [] });

    const fetchWishlist = async () => {
        if (!user) return;
        try {
            const { data } = await api.get("/wishlist");
            setWishlist(data);
        } catch (error) {
            console.error("Failed to load wishlist:", error.message);
        }
    };

    useEffect(() => {
        if (user) {
            fetchWishlist();
        } else {
            setWishlist({ products: [] });
        }
    }, [user]);

    const addToWishlist = async (productId) => {
        const { data } = await api.post("/wishlist", { productId });
        setWishlist(data);
    };

    const removeFromWishlist = async (productId) => {
        const { data } = await api.delete(`/wishlist/${productId}`);
        setWishlist(data);
    };

    // Helper used by ProductCard to show a filled/empty heart icon
    const isInWishlist = (productId) => {
        return wishlist.products.some((p) => p._id === productId);
    };

    return (
        <WishlistContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, fetchWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
