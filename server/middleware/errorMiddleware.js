// A simple, beginner-friendly way to catch errors in one place
// instead of writing try/catch with custom messages everywhere.

// Handles requests to routes that don't exist
const notFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

// Handles any error thrown/passed in the app
const errorHandler = (err, req, res, next) => {
    // Sometimes the status code is still 200 even though there's an error, fix that
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        message: err.message || "Something went wrong on the server",
    });
};

module.exports = { notFound, errorHandler };
