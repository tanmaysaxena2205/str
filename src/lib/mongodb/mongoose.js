import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

// We use a global variable to store the connection so it 
// persists across "hot reloads" during development.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  console.log("DEBUG: MONGODB_URL length is:", process.env.MONGODB_URL?.length);
console.log("DEBUG: MONGODB_URL ends with:", process.env.MONGODB_URL?.slice(-10));
  // 1. If we already have a connection, use it!
  if (cached.conn) return cached.conn;

  // 2. If the URL is missing, stop immediately.
  if (!MONGODB_URL) {
    throw new Error('CRITICAL ERROR: MONGODB_URL is missing from .env.local');
  }

  // 3. If there's no connection in progress, start one.
  cached.promise = cached.promise || mongoose.connect(MONGODB_URL, {
    dbName: 'langster_db', // This creates the database name in Atlas
    bufferCommands: false,
  });

  // 4. Wait for the connection to finish and save it.
  cached.conn = await cached.promise;
  
  console.log("Connected to MongoDB successfully!");
  return cached.conn;
};