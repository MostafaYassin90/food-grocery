import express from "express";
import { adminLogin, getSingleUser, userLogin, userSignUp } from "../controllers/userControllers.js";
import upload from './../middlewares/multer.js';
import userAuth from "../middlewares/userAuth.js";

const userRouter = express.Router();

userRouter.post("/sign-up", upload.single("image"), userSignUp);

userRouter.post("/login", userLogin);

userRouter.get("/user", userAuth, getSingleUser);

userRouter.post("/admin-login", adminLogin);

export default userRouter;