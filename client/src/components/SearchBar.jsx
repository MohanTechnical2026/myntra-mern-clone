// SearchBar - reusable search input. Used inside the Header.
// It just calls onSearch(term) when the user submits - it doesn't know
// anything about routing itself, keeping it simple and reusable.

import { useState } from "react";

const SearchBar = ({ onSearch, placeholder }) => {
    const [term, setTerm] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (term.trim()) {
            onSearch(term.trim());
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder={placeholder || "Search for products, brands and more"}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
