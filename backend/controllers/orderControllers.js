import OrderModel from "../models/orderModel.js";
import UserModel from './../models/userModel.js';
import Stripe from "stripe";
import "dotenv/config";

const stripe = new Stripe(process.env.STRIP_SECRET_KEY);

/* ------------ Place Order COD ------------ */
const placeOrder = async (req, res) => {
  try {
    const { items, address, amount, paymentType } = await req.body;
    const userId = await req.user;

    if (items.length === 0 || !items || !address || !amount || !paymentType) {
      return res.status(400).json({ success: false, message: "The Required Data Is Missing." });
    }

    const orderDetails = {
      userId: userId,
      items: items,
      address: address,
      amount: amount,
      paymentType: paymentType
    };

    const newOrder = new OrderModel(orderDetails);
    const order = await newOrder.save();

    // Find User Id To Clear CartData
    await UserModel.findByIdAndUpdate(userId, {
      $set: {
        cartData: {}
      }
    });

    return res.status(201).json({ success: true, order: order, message: "Order Placed Successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

};

/* ------------ orderPyementOnline ------------ */
const orderPaymentOnline = async (req, res) => {

  try {
    const frontEnd_url = "https://food-grocery-frontend.vercel.app";

    const { items, address, amount, paymentType } = await req.body;
    const userId = await req.user;

    if (items.length === 0 || !items || !address || !paymentType) {
      return res.status(400).json({ success: false, message: "The Required Data Is Missing." });
    }

    const orderDetails = {
      userId: userId,
      items: items,
      address: address,
      amount: amount,
      paymentType: paymentType
    };

    const newOrder = new OrderModel(orderDetails);
    const order = await newOrder.save();

    // Delete Cart Data
    await UserModel.findByIdAndUpdate(userId, {
      $set: {
        cartData: {}
      }
    });

    // Create Line Items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "USD",
        product_data: {
          name: item.name
        },
        unit_amount: (item.price - (item.price * (item.offerPrice / 100))) * 100
      },
      quantity: item.quantity
    }));
    // Dilevery Charges
    line_items.push({
      price_data: {
        currency: "USD",
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: 0 * 100
      },
      quantity: 1
    });
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontEnd_url}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${frontEnd_url}/verify?success=false&orderId=${order._id}`
    });
    return res.status(201).json({ success: true, session_url: session.url });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ------------ Verify Payment ------------ */
const verifyPayment = async (req, res) => {
  try {
    const { success, orderId } = await req.body;

    // Find Order Id
    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order Not Found!" });
    }
    if (success === "true") {
      // Update isPaid Into Tur
      await OrderModel.findByIdAndUpdate(orderId, {
        $set: {
          isPaid: true
        }
      });
      return res.status(200).json({ success: true, message: "Order Paid Successfully." });
    } else {
      // iF Success Is False Will Remove Order From DB
      await OrderModel.findByIdAndDelete(orderId);
      return res.status(200).json({ success: true, message: "Paid order has been canceled." });
    }



  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ------------ Get User Orders  ------------ */
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await OrderModel.find({ userId: userId });
    return res.status(200).json({ success: true, orders: orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ------------ Get All Orders  ------------ */
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    return res.status(200).json({ success: true, orders: orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  orderPaymentOnline,
  verifyPayment,
  getUserOrders,
  getAllOrders
};