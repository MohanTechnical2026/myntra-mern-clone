// Rating - shows a small star rating badge, e.g. "4.3 ★ | 120"

const Rating = ({ value, count }) => {
    if (!value) return null;

    return (
        <span className="rating-badge">
            {value.toFixed(1)} <span className="star">★</span>
            {count ? <span className="rating-count"> | {count}</span> : null}
        </span>
    );
};

export default Rating;
