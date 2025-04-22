import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

/* --------- User SignUp ---------- */
const userSignUp = async (req, res) => {

  try {
    const data = await req.body;   // username email password
    const imageFile = await req.file;

    const result = imageFile && await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
    const image_url = result && result.secure_url;

    const schema = z.object({
      username: z.string({ required_error: "Username Is Required." }).min(2, { message: "Username Must Be At Least 2 Characters." }).max(100),
      email: z.string({ required_error: "Email Is Required." }).email({ message: "Please Enter a Valid Email." }),
      password: z.string({ required_error: "Password Is Required." }).min(6, { message: "Password Must Be At Least 6 Characters." }).max(200)
    });

    const validation = schema.safeParse(data);

    if (!validation.success) {
      return res.status(400).json({ success: false, message: validation.error.errors[0].message });
    }

    // Check If Email Is Found
    const isExistsEmail = await UserModel.findOne({ email: data.email });
    if (isExistsEmail) {
      return res.status(400).json({ success: false, message: "Email Has Already Been Token." });
    }

    // Check If UserName If Found
    const isExsistsUsername = await UserModel.findOne({ username: data.username });
    if (isExsistsUsername) {
      return res.status(400).json({ success: false, message: "Username Is Already Registred." });
    }

    // Unique Name
    const uniqueUserName = data.username.replaceAll(" ", "") + Math.random().toString(9).slice(-2);

    // HashBassword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // User Details 
    const userDetails = {
      username: uniqueUserName,
      email: data.email,
      password: hashedPassword,
      image: image_url
    };

    // Create New User
    const newUser = new UserModel(userDetails);
    const user = await newUser.save();

    // Generate Token
    const userJwtPayload = {
      id: user._id
    };

    const token = jwt.sign(userJwtPayload, process.env.JWT_SECRET_KEY);

    // Destructured User To Response Without Password
    const { password, ...other } = user._doc;

    return res.status(201).json({ success: true, user: { ...other, token: token }, message: `Welcome Back ${user.username}` });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }


};

/* --------- User Login ---------- */
const userLogin = async (req, res) => {

  try {
    const data = await req.body; // email password

    const schema = z.object({
      email: z.string({ required_error: "Email Is Required." }).email({ message: "Please Type a Valid Email." }),
      password: z.string({ required_error: "Password Is Required." }).min(6, { message: "Password Must Be At Least 6 Characers." }).max(6)
    });

    const validation = schema.safeParse(data);
    if (!validation.success) {
      return res.status(400).json({ success: false, message: validation.error.errors[0].message });
    }

    // Find Email
    const user = await UserModel.findOne({ email: data.email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Email Or Password Is Wrong." });
    }
    // Compare Password
    const comparePassword = await bcrypt.compare(data.password, user.password);
    if (!comparePassword) {
      return res.status(400).json({ success: false, message: "Email Or Password Is Wrong." });
    }

    // Generate Token 
    const userJwtPayload = {
      id: user._id
    };

    const token = jwt.sign(userJwtPayload, process.env.JWT_SECRET_KEY);

    // Destructed User To Response WithOut Password
    const { password, ...other } = user._doc;

    return res.status(200).json({ success: true, user: { ...other, token: token }, message: `Welcome Back ${user.username}` });
  } catch (error) {
    return res.status(500).json({ success: 500, message: error.message });
  }

};


/* --------- Get Signle User ---------- */
const getSingleUser = async (req, res) => {
  try {
    const userId = await req.user;
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).josn({ success: false, message: "User Not Found." });
    }
    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


/* --------- Admin Login ---------- */
const adminLogin = async (req, res) => {
  try {
    const { email, password } = await req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "The Required Data Is Missing" });
    }

    if (process.env.ADMIN_EMAIL === email && process.env.ADMIN_PASSWORD === password) {
      const adminDetails = {
        email: email
      };
      const adminJwtPaylod = {
        email: email
      };
      const token = jwt.sign(adminJwtPaylod, process.env.JWT_SECRET_KEY);

      return res.status(200).json({ success: true, admin: { ...adminDetails, token: token }, message: "Welcome, Admin" });
    } else {
      return res.status(403).json({ success: false, message: "You Are Not Allowed To Access This Page." });
    }

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { userSignUp, userLogin, getSingleUser, adminLogin };