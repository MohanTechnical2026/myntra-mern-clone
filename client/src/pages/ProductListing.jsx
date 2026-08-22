// ProductListing page - reusable page for category browsing and search results.
// It reads filters/search/sort from the URL query string, so links like
// "/products?category=men" work directly, and filters are shareable via URL.

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import ProductGrid from "../components/ProductGrid";
import FilterSidebar from "../components/FilterSidebar";

const ProductListing = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState("recommended");

    // Read current filters straight from the URL
    const filters = {
        category: searchParams.get("category") || "",
        gender: searchParams.get("gender") || "",
        size: searchParams.get("size") || "",
        color: searchParams.get("color") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        search: searchParams.get("search") || "",
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);

            // Build query params object, only including filters that have a value
            const params = {};
            Object.keys(filters).forEach((key) => {
                if (filters[key]) params[key] = filters[key];
            });
            if (sort !== "recommended") params.sort = sort;

            const { data } = await api.get("/products", { params });
            setProducts(data);
        } catch (error) {
            console.error("Failed to load products:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, sort]);

    // Update one filter value in the URL (this is what FilterSidebar calls)
    const handleFilterChange = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        setSearchParams(newParams);
    };

    const handleClearFilters = () => {
        const newParams = new URLSearchParams();
        // Keep category/search since those came from navigation, not the filter sidebar
        if (filters.category) newParams.set("category", filters.category);
        if (filters.search) newParams.set("search", filters.search);
        setSearchParams(newParams);
    };

    const pageTitle = filters.search
        ? `Search results for "${filters.search}"`
        : filters.category
        ? filters.category.charAt(0).toUpperCase() + filters.category.slice(1)
        : "All Products";

    return (
        <div className="product-listing-page">
            <div className="breadcrumb">Home / {pageTitle}</div>

            <div className="listing-header">
                <h2>{pageTitle}</h2>
                <div className="listing-header-right">
                    <span className="product-count">{products.length} items</span>
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="recommended">Recommended</option>
                        <option value="priceLowToHigh">Price: Low to High</option>
                        <option value="priceHighToLow">Price: High to Low</option>
                        <option value="rating">Customer Rating</option>
                        <option value="discount">Discount</option>
                    </select>
                </div>
            </div>

            <div className="listing-layout">
                <FilterSidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                />

                <div className="listing-products">
                    {loading ? (
                        <p className="loading-text">Loading products...</p>
                    ) : (
                        <ProductGrid products={products} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductListing;
