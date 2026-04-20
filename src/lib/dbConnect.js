import mongoose from 'mongoose';

// Import all models using explicit relative paths with extensions
// Next.js 15 ESM resolution requires explicit file extensions for internal imports
import './models/Product.js';
import './models/Homepage.js';
import './models/Order.js';
import './models/Portfolio.js';
import './models/Settings.js';

const MONGO_URI = process.env.MONGO_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (!MONGO_URI) {
    console.error('❌ MONGO_URI is missing in .env.local');
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB Connected & Models Registered (Next.js Root)');
      return mongoose;
    }).catch(err => {
      console.error('❌ MongoDB Connection Error:', err.message);
      cached.promise = null;
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch {
    cached.promise = null;
    return null;
  }

  return cached.conn;
}

export default dbConnect;
