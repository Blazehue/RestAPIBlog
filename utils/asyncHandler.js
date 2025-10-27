// Async handler wrapper
// Wraps async functions to catch errors and pass to error handler

/**
 * Async handler wrapper to eliminate try-catch blocks
 * @param {Function} fn - Async function to wrap
 * @returns {Function} - Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
