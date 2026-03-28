const Devotee = require('../models/Devotee');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_for_dev_only', {
        expiresIn: '30d' // Token valid for 30 days
    });
};

// @desc    Register a new devotee
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }

        // Check if user already exists
        const userExists = await Devotee.findOne({ email });

        if (userExists) {
            return res.status(400).json({ success: false, message: 'Devotee already exists with this email' });
        }

        // Create new devotee
        const devotee = await Devotee.create({
            firstName,
            lastName,
            email,
            password,
            phone
        });

        // Generate token
        const token = generateToken(devotee._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: devotee._id,
                firstName: devotee.firstName,
                lastName: devotee.lastName,
                email: devotee.email,
                role: devotee.role
            }
        });
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ success: false, message: 'Server error during signup' });
    }
};

// @desc    Login devotee & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        // Find user by email and explicitly select the password field
        const devotee = await Devotee.findOne({ email }).select('+password');

        if (!devotee) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Check if password matches
        const isMatch = await devotee.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        // Generate token
        const token = generateToken(devotee._id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: devotee._id,
                firstName: devotee.firstName,
                lastName: devotee.lastName,
                email: devotee.email,
                role: devotee.role
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
};

// @desc    Get current logged in devotee profile
// @route   GET /api/auth/profile
// @access  Private
exports.getProfile = async (req, res) => {
    try {
        const devotee = await Devotee.findById(req.user.id);

        if (!devotee) {
            return res.status(404).json({ success: false, message: 'Devotee not found' });
        }

        res.status(200).json({
            success: true,
            user: {
                id: devotee._id,
                firstName: devotee.firstName,
                lastName: devotee.lastName,
                email: devotee.email,
                phone: devotee.phone,
                role: devotee.role,
                createdAt: devotee.createdAt
            }
        });
    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({ success: false, message: 'Server error fetching profile' });
    }
};

// @desc    Authenticate with Google Identity Services
// @route   POST /api/auth/google
// @access  Public
exports.googleAuth = async (req, res) => {
    try {
        const { accessToken } = req.body;

        if (!accessToken) {
            return res.status(400).json({ success: false, message: 'No access token provided' });
        }

        // Use the access_token to fetch user profile from Google's userinfo endpoint
        const googleRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        if (!googleRes.ok) {
            return res.status(401).json({ success: false, message: 'Invalid Google access token' });
        }

        const profile = await googleRes.json();
        const { sub, email, given_name, family_name, name } = profile;

        if (!email) {
            return res.status(400).json({ success: false, message: 'No email found in Google profile' });
        }

        let devotee = await Devotee.findOne({ email });

        // If user doesn't exist, create them
        if (!devotee) {
            devotee = await Devotee.create({
                firstName: given_name || (name ? name.split(' ')[0] : 'Devotee'),
                lastName: family_name || (name && name.includes(' ') ? name.slice(name.indexOf(' ') + 1) : ''),
                email: email,
                password: sub,
            });
        }

        const token = generateToken(devotee._id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: devotee._id,
                firstName: devotee.firstName,
                lastName: devotee.lastName,
                email: devotee.email,
                phone: devotee.phone,
                role: devotee.role
            }
        });

    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(401).json({ success: false, message: 'Invalid or expired Google token' });
    }
};
