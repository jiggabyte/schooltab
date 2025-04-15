const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        return next(); // User is authenticated, proceed to the next middleware or route handler
    }
    return res.status(401).json({ error: 'Unauthorized. Please log in.' }); // User is not authenticated
};

module.exports = isAuthenticated;