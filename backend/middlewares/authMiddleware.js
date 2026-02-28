const jwt = require('jsonwebtoken');
const Devotee = require('../models/Devotee');

exports.protect = async (req, res, next) => {
    let token;

    // Check if token exists in headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route. No token provided.' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_for_dev_only');

        // Find user by id from the decoded token payload
        req.user = await Devotee.findById(decoded.id);

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Not authorized. User no longer exists.' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Not authorized to access this route. Token failed.' });
    }
};
