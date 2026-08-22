// Home page - hero banner, category banners, and a couple of product sections.

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductGrid from "../components/ProductGrid";
import CategoryBanner from "../components/CategoryBanner";

const CATEGORIES = [
    { title: "Men", link: "/products?category=men", image: "/local-assets/banners/men.jpg" },
    { title: "Women", link: "/products?category=women", image: "/local-assets/banners/women.jpg" },
    { title: "Kids", link: "/products?category=kids", image: "/local-assets/banners/kids.jpg" },
    {
        title: "Footwear",
        link: "/products?category=footwear",
        image: "/local-assets/banners/footwear.jpg",
    },
    { title: "Beauty", link: "/products?category=beauty", image: "/local-assets/banners/beauty.jpg" },
    {
        title: "Accessories",
        link: "/products?category=accessories",
        image: "/local-assets/banners/accessories.jpg",
    },
];

const Home = () => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHomeData = async () => {
            try {
                setLoading(true);
                // "New arrivals" = latest products (default sort is newest first)
                const newArrivalsRes = await api.get("/products");
                setNewArrivals(newArrivalsRes.data.slice(0, 8));

                // "Deals" = products sorted by biggest discount
                const dealsRes = await api.get("/products?sort=discount");
                setDeals(dealsRes.data.slice(0, 8));
            } catch (error) {
                console.error("Failed to load home page products:", error.message);
            } finally {
                setLoading(false);
            }
        };

        loadHomeData();
    }, []);

    return (
        <div className="home-page">
            {/* Hero Banner */}
            <section className="hero-banner">
                <div className="hero-text">
                    <h1>The Season's Edit</h1>
                    <p>Fresh styles across fashion, footwear, beauty &amp; more.</p>
                    <Link to="/products" className="btn-primary">
                        Shop Now
                    </Link>
                </div>
            </section>

            {/* Category Section */}
            <section className="category-section">
                <h2>Shop by Category</h2>
                <div className="category-grid">
                    {CATEGORIES.map((cat) => (
                        <CategoryBanner
                            key={cat.title}
                            title={cat.title}
                            image={cat.image}
                            link={cat.link}
                        />
                    ))}
                </div>
            </section>

            {/* New Arrivals */}
            <section className="product-section">
                <h2>New Arrivals</h2>
                {loading ? <p className="loading-text">Loading products...</p> : <ProductGrid products={newArrivals} />}
            </section>

            {/* Deals Section */}
            <section className="product-section">
                <h2>Best Deals</h2>
                {loading ? <p className="loading-text">Loading products...</p> : <ProductGrid products={deals} />}
            </section>
        </div>
    );
};

export default Home;
