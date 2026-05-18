require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8']);

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  
  if (!mongoURI || mongoURI.includes('username:password@cluster0.xxxxx')) {
    console.log('MongoDB URI not configured - using offline mode');
    console.log('Set MONGO_URI in .env to connect to database');
    return false;
  }

  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('\nTo fix:');
    console.log('1. Update MONGO_URI with your Atlas connection string');
    console.log('2. Check IP whitelist in Atlas Network Access');
    console.log('3. Ensure cluster is running');
    return false;
  }
};

module.exports = connectDB;
