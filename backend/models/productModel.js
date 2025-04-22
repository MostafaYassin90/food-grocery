import mongoose from "mongoose";

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: Array, required: true },
  category: { type: String, required: true },
  image: { type: Array, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number, requuired: true },
  inStock: { type: Boolean, default: true }
}, { timestamps: true, minimize: true });

// Product Model
const ProductModel = mongoose.model("Product", productSchema);


export default ProductModel;