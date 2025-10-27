// Auth routes - Defines authentication endpoints
// Routes: register, login, and get current user

const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe
} = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validation');
const { protect } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

// Public routes with rate limiting
router.post('/register', authLimiter, validateRegister, registerUser);
router.post('/login', authLimiter, validateLogin, loginUser);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router;
