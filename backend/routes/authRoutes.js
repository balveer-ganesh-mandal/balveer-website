const express = require('express');
const router = express.Router();
const { signup, login, getProfile, firebaseAuth } = require('../controllers/authController');

const { protect } = require('../middlewares/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.post('/firebase', firebaseAuth);

router.get('/profile', protect, getProfile);

module.exports = router;
