import express from "express";
import userAuth from './../middlewares/userAuth.js';
import { addUserAddress, getUserAddress } from "../controllers/userAddressControllers.js";

const userAddressRoute = express.Router();

userAddressRoute.post("/add", userAuth, addUserAddress);

userAddressRoute.get("/list", userAuth, getUserAddress);


export default userAddressRoute;