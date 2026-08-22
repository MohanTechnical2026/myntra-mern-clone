// Profile page - shows user info, allows editing name/mobile, and links to
// My Orders / Wishlist / Saved Addresses / Logout.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProfile = async () => {
            try {
                setLoading(true);
                const { data } = await api.get("/users/profile");
                setProfile(data);
                setName(data.name);
                setMobile(data.mobile || "");
            } catch (error) {
                console.error("Failed to load profile:", error.message);
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            await api.put("/users/profile", { name, mobile });
            setMessage("Profile updated successfully.");
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to update profile.");
        }
    };

    if (loading) return <p className="loading-text">Loading profile...</p>;

    return (
        <div className="profile-page">
            <h2>My Profile</h2>

            <div className="profile-layout">
                <form className="profile-form" onSubmit={handleSave}>
                    {message && <p className="form-success">{message}</p>}

                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} required />

                    <label>Email</label>
                    <input value={profile?.email || ""} disabled />

                    <label>Mobile Number</label>
                    <input value={mobile} onChange={(e) => setMobile(e.target.value)} />

                    <button type="submit" className="btn-primary">
                        Save Changes
                    </button>
                </form>

                <div className="profile-links">
                    <Link to="/orders" className="profile-link-card">
                        My Orders
                    </Link>
                    <Link to="/wishlist" className="profile-link-card">
                        Wishlist
                    </Link>
                    <div className="profile-link-card">
                        <h4>Saved Addresses</h4>
                        {profile?.addresses && profile.addresses.length > 0 ? (
                            profile.addresses.map((addr, index) => (
                                <p key={index}>
                                    {addr.name}, {addr.address}, {addr.city}, {addr.state} -{" "}
                                    {addr.pincode}
                                </p>
                            ))
                        ) : (
                            <p>No saved addresses yet. You'll enter your delivery address each time you check out.</p>
                        )}
                    </div>
                    <button className="btn-outline" onClick={logout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
