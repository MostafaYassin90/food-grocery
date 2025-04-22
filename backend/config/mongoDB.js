import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("DB Connection Stublished Successfully!");
  } catch (error) {
    console.log("Failed To Connect DB!");
  }
};

export default connectDB;
