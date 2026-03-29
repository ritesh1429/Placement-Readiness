import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    // Falls back to local MongoDB daemon if MONGO_URI is omitted structurally
    const uri = process.env.MONGO_URI || 'mongodb+srv://ritesh:ritesh%40123@cluster0.eku2w3j.mongodb.net/Placement-Readiness';
    const conn = await mongoose.connect(uri);
    console.log(`✓ MongoDB Connected Securely: ${conn.connection.host}`);
  } catch (error) {
    console.error(`⨯ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
