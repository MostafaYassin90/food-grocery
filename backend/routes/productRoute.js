import express from "express";
import { addProduct, changeStock, getAllProducts, getSingleProducts } from "../controllers/productControllers.js";
import upload from "../middlewares/multer.js";
import adminAuth from "../middlewares/adminAuth.js";


const productRouter = express.Router();

productRouter.post("/add", upload.fields([{ name: "image1", maxCount: 1 }, { name: "image2", maxCount: 1 }, { name: "image3", maxCount: 1 }, { name: "image4", maxCount: 1 }]), adminAuth, addProduct);

productRouter.get("/list", getAllProducts);

productRouter.post("/single-product", getSingleProducts);

productRouter.post("/stock", adminAuth, changeStock);

export default productRouter;