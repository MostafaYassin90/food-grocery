import express from "express";
import userAuth from './../middlewares/userAuth.js';
import { addToCart, getCartData, removeFromCart, updateCartData } from "../controllers/cartControllers.js";

const cartRouter = express.Router();

cartRouter.post("/add", userAuth, addToCart);

cartRouter.post("/remove", userAuth, removeFromCart);

cartRouter.post("/update", userAuth, updateCartData);

cartRouter.get("/data", userAuth, getCartData);


export default cartRouter;