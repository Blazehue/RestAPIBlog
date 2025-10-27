// JWT utility functions
// Provides functions to generate JWT tokens

const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require('../config/jwt');

/**
 * Generate JWT token for a user
 * @param {string} id - User ID to encode in token
 * @returns {string} - JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: jwtExpire
  });
};

module.exports = { generateToken };
