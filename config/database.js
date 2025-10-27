// Database configuration module
// Provides MongoDB connection URI and options

module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/blog-api',
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
};
