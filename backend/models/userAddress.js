import mongoose from "mongoose";

// User Address Schema
const userAddressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  zipCode: { type: String, required: true },
  state: { type: String, required: true },
  phone: { type: String, required: true },
}, { timestamps: true });


// User Address Model
const UserAddressModel = mongoose.model("Address", userAddressSchema);

export default UserAddressModel;