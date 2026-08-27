import mongoose from 'mongoose'

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  }
}

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI or MONGO_URI environment variable is required')
  }

  if (cached.conn) {
    console.log('MongoDB already connected')
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
  }

  try {
    cached.conn = await cached.promise
    console.log('MongoDB connected successfully')
    return cached.conn
  } catch (error) {
    cached.promise = null
    console.error('MongoDB connection error:', error.message)
    throw error
  }
}

export default connectDB
