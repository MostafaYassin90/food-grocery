import express from "express";
import cors from "cors";
import connectDB from "./config/mongoDB.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import userAddressRoute from "./routes/userMessageRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || "4000";

// Config
await connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// EndPoints
app.use("/api/user", userRouter);
app.use("/api/user-address", userAddressRoute);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", async (req, res) => {
  res.send("API Is Working!");
});


// Listen
app.listen(port, () => {
  console.log(`Server Is Running On Port${port}`);
});
