import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

const connectCloudinary = async () => {
  try {
    await cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log("Cloudinary Conttetion Sublished Successfully!");
  } catch (error) {
    console.log("Failed To Connect Cloudinary!");
  }
};
export default connectCloudinary;