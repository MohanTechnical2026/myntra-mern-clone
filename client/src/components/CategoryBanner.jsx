// CategoryBanner - a clickable banner used on the homepage to link to a category.

import { Link } from "react-router-dom";

const CategoryBanner = ({ title, subtitle, image, link }) => {
    return (
        <Link to={link} className="category-banner">
            <img src={image} alt={title} />
            <div className="category-banner-text">
                <h3>{title}</h3>
                {subtitle && <p>{subtitle}</p>}
            </div>
        </Link>
    );
};

export default CategoryBanner;
