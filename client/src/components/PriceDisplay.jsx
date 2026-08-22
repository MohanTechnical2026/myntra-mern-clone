// PriceDisplay - shows current price, crossed-out original price, and discount %

const PriceDisplay = ({ price, originalPrice, discount }) => {
    return (
        <div className="price-display">
            <span className="current-price">₹{price}</span>
            {originalPrice > price && (
                <span className="original-price">₹{originalPrice}</span>
            )}
            {discount > 0 && <span className="discount">({discount}% OFF)</span>}
        </div>
    );
};

export default PriceDisplay;
