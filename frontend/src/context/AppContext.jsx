import { createContext, useEffect, useState } from "react";
import { dummyProducts } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext(null);


const AppContextProvider = (props) => {
  const [allProducts, setAllProducts] = useState([]);
  const [cartItems, setCartItems] = useState({}); // {a:4, b:3}
  const [showSignIn, setShowSignIn] = useState(false);
  const currency = "$";
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
  const [userData, setUserData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


  // Get All Products 
  const getAllProducts = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/list");
      if (response.data.success) {
        setAllProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get User Data
  const getUserDataHandler = async () => {
    try {
      const response = await axios.get(backend_url + "/api/user/user", {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        setUserData(response.data.user);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  // Calculate Product Discount
  const calculateProductDiscount = (price, discount) => {
    let finallyDiscount = 0;
    finallyDiscount = price - (price * (discount / 100));
    return Number(finallyDiscount.toFixed(0));
  };

  // Add To Cart
  const addToCart = async (productId) => {
    let cartData = structuredClone(cartItems); // {a: 1, b:1}
    if (cartData[productId]) {
      cartData[productId] += 1;
    } else {
      cartData[productId] = 1;
    }
    // Backends
    if (token) {
      const response = await axios.post(backend_url + "/api/cart/add", { productId: productId }, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        toast.success(response.data.message);
      }
    }
    setCartItems(cartData);
  };

  // Update Cart Item
  const updateCartItem = async (productId, value) => {
    console.log(value);
    let cartItemsData = structuredClone(cartItems); // {a: 1, b: 2, c: 3}

    if (cartItemsData[productId]) {
      if (cartItemsData[productId] > 0) {
        cartItemsData[productId] = value;
      }
    }
    // Backend
    if (token) {
      const response = await axios.post(backend_url + "/api/cart/update", { productId: productId, value: value }, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        toast.success(response.data.message);
      }
    }
    setCartItems(cartItemsData);
  };

  // Remove From Cart
  const removeFromCart = async (productId) => {
    let cartData = structuredClone(cartItems); // {a: 0, b:5}
    if (cartData[productId]) {
      if (cartData[productId] > 0) {
        cartData[productId] -= 1;
      }
    }
    if (cartData[productId] === 0) {
      delete cartData[productId];
    }
    // Backend
    if (token) {
      const response = await axios.post(backend_url + "/api/cart/remove", { productId: productId }, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        toast.success(response.data.message);
      }
    }
    setCartItems(cartData);
  };

  // Get CartItems
  const getCartItems = async () => {
    try {
      const response = await axios.get(backend_url + "/api/cart/data", {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  // Collect CartItems Products Count 
  const collectCartItemsCount = () => {
    let itemsCount = 0;
    for (const items in cartItems) { // {  a: 1, b: 1, c: 1 }
      if (cartItems[items] > 0) {
        itemsCount += cartItems[items];
      }
    }
    return itemsCount;
  };

  // Calculate CartItems Amount
  const productsCartAmount = () => { // {a:1, b: 1, b: 1} product price offerPrice
    let productsAmount = 0;
    for (const item in cartItems) {
      allProducts.map((product) => {
        if (product._id === item) {
          productsAmount += ((product.price - (product.price * (product.offerPrice / 100))).toFixed(0)) * cartItems[item];
        }
      });
    }
    return productsAmount;
  };



  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (token) {
      getUserDataHandler();
    };
  }, [token]);

  useEffect(() => {
    if (token) {
      getCartItems();
    }
  }, [token]);

  const value = {
    allProducts: allProducts,
    getAllProducts: getAllProducts,
    calculateProductDiscount: calculateProductDiscount,
    currency: currency,
    cartItems: cartItems,
    setCartItems: setCartItems,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    updateCartItem: updateCartItem,
    collectCartItemsCount: collectCartItemsCount,
    showSignIn: showSignIn,
    setShowSignIn: setShowSignIn,
    backend_url: backend_url,
    token: token,
    setToken: setToken,
    userData: userData,
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,
    productsCartAmount: productsCartAmount,
  };
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;