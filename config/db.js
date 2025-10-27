// Database connection module
// Connects to MongoDB with error handling and retry logic

const mongoose = require('mongoose');
const { mongoURI, mongoOptions } = require('./database');

/**
 * Connect to MongoDB database
 * @returns {Promise} - Promise that resolves when connected
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI, mongoOptions);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    
    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Retry connection after 5 seconds
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
