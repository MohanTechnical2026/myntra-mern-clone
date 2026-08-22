// ProductGrid - lays out a list of ProductCard components in a grid.
// Also handles the "no products found" empty state.

import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
    if (!products || products.length === 0) {
        return (
            <div className="empty-state">
                <p>No products found.</p>
                <p className="empty-state-sub">Try changing your filters or search term.</p>
            </div>
        );
    }

    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
