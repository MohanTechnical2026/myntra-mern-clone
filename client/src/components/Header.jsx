// Header - shown on every page. Logo, nav links, search bar, and icons
// for profile/wishlist/bag. The profile icon opens a small dropdown:
// - if logged in: links to Profile/Orders and a Logout button
// - if logged out: Login and Sign Up buttons

import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import SearchBar from "./SearchBar";
import { UserIcon, HeartIcon, BagIcon } from "./Icons";

const Header = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const { wishlist } = useWishlist();
    const navigate = useNavigate();

    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileMenuRef = useRef(null);

    const handleSearch = (term) => {
        navigate(`/products?search=${encodeURIComponent(term)}`);
    };

    // Close the dropdown if the user clicks anywhere outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogoutClick = () => {
        logout();
        setShowProfileMenu(false);
        navigate("/");
    };

    const bagCount = cart.items ? cart.items.length : 0;
    const wishlistCount = wishlist.products ? wishlist.products.length : 0;

    return (
        <header className="header">
            <div className="header-top">
                <Link to="/" className="logo">
                    Style<span>Bazaar</span>
                </Link>

                <nav className="nav-links">
                    <Link to="/products?category=men">MEN</Link>
                    <Link to="/products?category=women">WOMEN</Link>
                    <Link to="/products?category=kids">KIDS</Link>
                    <Link to="/products?category=home">HOME &amp; LIVING</Link>
                    <Link to="/products?category=beauty">BEAUTY</Link>
                </nav>

                <SearchBar onSearch={handleSearch} />

                <div className="header-icons">
                    {/* Profile icon + dropdown */}
                    <div className="icon-item-wrapper" ref={profileMenuRef}>
                        <button
                            className="icon-item"
                            onClick={() => setShowProfileMenu((open) => !open)}
                        >
                            <UserIcon />
                            <span>Profile</span>
                        </button>

                        {showProfileMenu && (
                            <div className="profile-dropdown">
                                {user ? (
                                    <>
                                        <p className="dropdown-greeting">Hi, {user.name}</p>
                                        <Link
                                            to="/profile"
                                            className="dropdown-item"
                                            onClick={() => setShowProfileMenu(false)}
                                        >
                                            My Profile
                                        </Link>
                                        <Link
                                            to="/orders"
                                            className="dropdown-item"
                                            onClick={() => setShowProfileMenu(false)}
                                        >
                                            My Orders
                                        </Link>
                                        <button className="dropdown-item" onClick={handleLogoutClick}>
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="btn-primary dropdown-btn"
                                            onClick={() => setShowProfileMenu(false)}
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="btn-outline dropdown-btn"
                                            onClick={() => setShowProfileMenu(false)}
                                        >
                                            Sign Up
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Wishlist icon */}
                    <Link to="/wishlist" className="icon-item">
                        <span className="icon-badge-wrapper">
                            <HeartIcon />
                            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
                        </span>
                        <span>Wishlist</span>
                    </Link>

                    {/* Bag icon */}
                    <Link to="/cart" className="icon-item">
                        <span className="icon-badge-wrapper">
                            <BagIcon />
                            {bagCount > 0 && <span className="badge">{bagCount}</span>}
                        </span>
                        <span>Bag</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
