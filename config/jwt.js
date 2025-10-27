// JWT configuration module
// Provides JWT secret and expiration settings

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'default_secret_change_in_production',
  jwtExpire: process.env.JWT_EXPIRE || '30d'
};
