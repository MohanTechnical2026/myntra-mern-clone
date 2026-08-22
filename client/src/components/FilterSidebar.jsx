// FilterSidebar - simple checkboxes/selects for gender, brand, price, size, color.
// Parent page (ProductListing) owns the actual filter state; this component
// just displays inputs and calls onChange when something is picked.

const GENDER_OPTIONS = ["men", "women", "kids", "unisex"];
const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"];
const COLOR_OPTIONS = ["Red", "Blue", "Black", "White", "Green", "Pink", "Yellow", "Grey"];

const FilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
    return (
        <aside className="filter-sidebar">
            <div className="filter-header">
                <h3>Filters</h3>
                <button className="link-button" onClick={onClearFilters}>
                    Clear All
                </button>
            </div>

            <div className="filter-group">
                <h4>Gender</h4>
                {GENDER_OPTIONS.map((g) => (
                    <label key={g} className="filter-option">
                        <input
                            type="radio"
                            name="gender"
                            checked={filters.gender === g}
                            onChange={() => onFilterChange("gender", g)}
                        />
                        {g.charAt(0).toUpperCase() + g.slice(1)}
                    </label>
                ))}
            </div>

            <div className="filter-group">
                <h4>Price</h4>
                <div className="price-inputs">
                    <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice || ""}
                        onChange={(e) => onFilterChange("minPrice", e.target.value)}
                    />
                    <span>to</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice || ""}
                        onChange={(e) => onFilterChange("maxPrice", e.target.value)}
                    />
                </div>
            </div>

            <div className="filter-group">
                <h4>Size</h4>
                {SIZE_OPTIONS.map((s) => (
                    <label key={s} className="filter-option">
                        <input
                            type="radio"
                            name="size"
                            checked={filters.size === s}
                            onChange={() => onFilterChange("size", s)}
                        />
                        {s}
                    </label>
                ))}
            </div>

            <div className="filter-group">
                <h4>Color</h4>
                {COLOR_OPTIONS.map((c) => (
                    <label key={c} className="filter-option">
                        <input
                            type="radio"
                            name="color"
                            checked={filters.color === c}
                            onChange={() => onFilterChange("color", c)}
                        />
                        {c}
                    </label>
                ))}
            </div>
        </aside>
    );
};

export default FilterSidebar;
