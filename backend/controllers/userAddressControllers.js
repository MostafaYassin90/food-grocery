import { z } from "zod";
import UserAddressModel from "../models/userAddress.js";

/* -------------- Add Address -------------- */
const addUserAddress = async (req, res) => {

  try {
    const { firstName, lastName, email, country,
      city, street, zipCode, state, phone } = await req.body;
    const userId = await req.user;
    const schema = z.object({
      firstName: z.string({ required_error: "FirstName Is Requried" }).min(2, { message: "FirstName Must Be At Least 2 Characters." }).max(100),
      lastName: z.string({ required_error: "LastName Is Requried" }).min(2, { message: "LastName Must Be At Least 2 Characters." }).max(100),
      email: z.string({ required_error: "Email Is Requried" }).email({ message: "Please Type a Valid Email." }),
      country: z.string({ required_error: "Country Is Requried" }).min(2, { message: "Country Must Be At Least 2 Characters." }).max(100),
      city: z.string({ required_error: "city Is Requried" }).min(2, { message: "city Must Be At Least 2 Characters." }).max(100),
      street: z.string({ required_error: "street Is Requried" }).min(2, { message: "street Must Be At Least 2 Characters." }).max(100),
      zipCode: z.string({ required_error: "zipCode Is Requried" }).min(4, { message: "zipCode Must Be At Least 4 Characters." }).max(100),
      state: z.string({ required_error: "state Is Requried" }).min(2, { message: "state Must Be At Least 2 Characters." }).max(100),
      phone: z.string({ required_error: "phone Is Requried" }).min(9, { message: "phone Must Be At Least 9 Characters." }).max(100),
    });

    const validation = schema.safeParse({
      firstName, lastName, email, country,
      city, street, zipCode, state, phone
    });
    if (!validation.success) {
      return res.status(400).json({ success: false, message: validation.error.errors[0].message });
    }
    const userMessageDetails = {
      userId,
      firstName,
      lastName,
      email,
      country,
      city,
      street,
      zipCode: Number(zipCode),
      state,
      phone: Number(phone)
    };
    const newUserMessage = new UserAddressModel(userMessageDetails);
    const userMessage = await newUserMessage.save();
    return res.status(201).json({ success: true, userMessage: userMessage, message: "Message Added Successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get User Address By UserId
const getUserAddress = async (req, res) => {
  try {
    const userId = await req.user;

    const userAddress = await UserAddressModel.find({ userId: userId });
    if (!userAddress) {
      return res.status(404).json({ success: false, message: "User Address Not Found." });
    }
    return res.status(200).json({ success: true, userAddress: userAddress });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { addUserAddress, getUserAddress };