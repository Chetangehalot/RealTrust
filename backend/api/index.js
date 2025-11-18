// Vercel serverless function entry point
require('dotenv').config();
const mongoose = require('mongoose');

// Import the Express app (this will define all routes)
const app = require('../server');

// Database connection state
let isConnected = false;

// Connect to database
const connectDatabase = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }
  
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    // Reuse existing connection if available
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 10000,
      });
      console.log('✅ Database connected in serverless function');
    }
    
    isConnected = true;
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    // Don't throw - let the request handler deal with it
    isConnected = false;
  }
};

// Export the handler for Vercel
module.exports = async (req, res) => {
  // Connect to database if not already connected
  await connectDatabase();
  
  // Handle the request with the Express app
  return app(req, res);
};

