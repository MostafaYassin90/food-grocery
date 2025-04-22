import UserModel from './../models/userModel.js';

// Add To Cart Data
const addToCart = async (req, res) => {

  try {
    const { productId } = await req.body;
    const userId = await req.user;
    // Find User Based On UserId
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User Not found!" });
    }
    let cartData = await user.cartData; // {}

    if (cartData[productId]) {
      cartData[productId] += 1;
    } else {
      cartData[productId] = 1;
    }
    await UserModel.findByIdAndUpdate(userId, {
      $set: {
        cartData: cartData
      }
    });

    return res.status(201).json({ success: true, message: "Added To Cart" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

};

// Remove From Cart Data
const removeFromCart = async (req, res) => {

  try {
    const { productId } = await req.body;
    const userId = await req.user;

    // Find User Based On UserId
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found!" });
    }

    let cartData = await user.cartData; // {a: 2, b:1, c:0}

    if (cartData[productId]) {
      if (cartData[productId] > 0) {
        cartData[productId] -= 1;
      }
      if (cartData[productId] === 0) {
        delete cartData[productId];
      }
    }
    console.log(cartData);

    await UserModel.findByIdAndUpdate(userId, {
      $set: {
        cartData: cartData
      }
    });

    return res.status(200).json({ success: true, cartData: cartData, message: "Removed From Cart" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }


};

// Update Cart Data
const updateCartData = async (req, res) => {

  try {
    const { productId, value } = await req.body;
    const userId = await req.user;

    // Find User Based On UserId
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found!" });
    }
    const cartData = await user.cartData; // { a:1, b:2, c:4 }
    if (cartData[productId]) {
      if (cartData[productId] > 0) {
        cartData[productId] = value;
      }
    }
    await UserModel.findByIdAndUpdate(userId, {
      $set: {
        cartData: cartData
      }
    });

    return res.status(200).json({ success: true, message: "Cart Updated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

};



// Get Cart Items
const getCartData = async (req, res) => {
  try {
    const userId = await req.user;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found!" });
    }
    const cartData = await user.cartData;
    return res.status(200).json({ success: true, cartData: cartData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.messsage });
  }
};


export { addToCart, removeFromCart, getCartData, updateCartData };