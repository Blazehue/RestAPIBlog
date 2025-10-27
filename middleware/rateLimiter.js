// Rate limiting middleware
// Prevents brute force attacks on authentication routes

const rateLimit = require('express-rate-limit');

/**
 * Rate limiter for authentication routes
 * Limits requests to 5 per 15 minutes per IP
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    error: 'Too many authentication attempts, please try again after 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * General API rate limiter
 * Limits requests to 100 per 15 minutes per IP
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: 'Too many requests, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { authLimiter, apiLimiter };
