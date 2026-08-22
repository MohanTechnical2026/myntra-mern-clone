// ProtectedRoute - wraps pages that require login (Cart, Wishlist, Checkout, Profile, Orders).
// If there's no logged-in user, it redirects to the login page.

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
