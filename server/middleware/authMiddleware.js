// This middleware checks if a request has a valid JWT token.
// If yes, it lets the request continue and attaches the user's id to req.user.
// If no, it blocks the request with a 401 (Unauthorized) error.

const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    // The frontend should send the token like this:
    // Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // decoded.id was set when we created the token during login/register
        req.user = { id: decoded.id };

        next(); // token is valid, continue to the actual route
    } catch (error) {
        return res.status(401).json({ message: "Not authorized, invalid token" });
    }
};

module.exports = protect;
