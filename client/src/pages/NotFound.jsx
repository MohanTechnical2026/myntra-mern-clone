import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="empty-state">
            <h2>404</h2>
            <p>The page you're looking for doesn't exist.</p>
            <Link to="/" className="btn-primary">
                Go to Homepage
            </Link>
        </div>
    );
};

export default NotFound;
