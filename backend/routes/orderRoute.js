import express from "express";
import userAuth from './../middlewares/userAuth.js';
import { getAllOrders, getUserOrders, orderPaymentOnline, placeOrder, verifyPayment } from "../controllers/orderControllers.js";
import adminAuth from './../middlewares/adminAuth.js';

const orderRouter = express.Router();

orderRouter.post("/place-order", userAuth, placeOrder);

orderRouter.post("/payment-online", userAuth, orderPaymentOnline);

orderRouter.post("/verify", verifyPayment);

orderRouter.get("/user", userAuth, getUserOrders);

orderRouter.get("/list", adminAuth, getAllOrders);

export default orderRouter;