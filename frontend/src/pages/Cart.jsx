import { useContext, useEffect, useState } from "react";
import { AppContext } from './../context/AppContext';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "react-toastify";

function Cart() {
  const { allProducts, cartItems, setCartItems, calculateProductDiscount, removeFromCart, collectCartItemsCount,
    currency, updateCartItem, productsCartAmount, backend_url, token } = useContext(AppContext);
  const [showAddress, setShowAddress] = useState(false);
  const [productsCart, setProductsCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [address, setAddress] = useState([]);
  const [addressSelected, setAddressSelected] = useState(null);
  const navigate = useNavigate();

  // Collect Products Cart
  const collectProductsCart = () => {
    let productsCartData = [];
    for (const items in cartItems) { // { a:1, b:1, c:1 }
      allProducts.map((product) => {
        if (product._id === items) {
          productsCartData.push({
            ...product,
            quantity: cartItems[items]
          });
        }
      });
    }
    setProductsCart(productsCartData);
  };

  // Get User Address
  const getUserAddress = async () => {
    try {
      const response = await axios.get(backend_url + "/api/user-address/list", {
        headers: { authorization: "Bearer " + token }
      });
      console.log(response);
      if (response.data.success) {
        setAddress(response.data.userAddress);
        setAddressSelected(response.data.userAddress[0]);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  // Place Order
  const placeOrder = async () => {
    if (!token) {
      toast.error("Please Login Fisrt To Place Order.");
      return null;
    }
    if (productsCart.length === 0 || !addressSelected || !paymentMethod) {
      toast.info("The Required Data Is Missing.");
      return null;
    }
    if (paymentMethod === "COD") {
      const orderDetails = {
        items: productsCart,
        address: addressSelected,
        amount: Number(productsCartAmount() + (productsCartAmount() * (2 / 100))),
        paymentType: paymentMethod
      };
      try {
        const response = await axios.post(backend_url + "/api/order/place-order", orderDetails, {
          headers: { authorization: "Bearer " + token }
        });
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/my-orders");
          setCartItems({});
        }
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      }
    } else {
      const orderDetails = {
        items: productsCart,
        address: addressSelected,
        amount: Number(productsCartAmount() + (productsCartAmount() * (2 / 100))),
        paymentType: paymentMethod
      };
      try {
        const response = await axios.post(backend_url + "/api/order/payment-online", orderDetails, {
          headers: { authorization: "Bearer " + token }
        });
        console.log(response);
        if (response.data.success) {
          toast.success(response.data.message);
          setCartItems({});
          window.location.replace(response.data.session_url);
        }
      } catch (error) {
        toast.error(error.response.data.message || error.message);
      }
    }
  };


  useEffect(() => {
    if (token) {
      getUserAddress();
    }
  }, [token]);

  useEffect(() => {
    collectProductsCart();
  }, [cartItems]);



  return (
    <div className="py-20 min-h-[100vh] px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">
      <div className="flex flex-col md:flex-row items-start gap-x-4 gap-y-6">

        {/* Left Side */}
        <div className="w-full">
          {/* Title */}
          <div className="flex items-end gap-2 mb-10">
            <p className="text-3xl text-gray-700 font-semibold">Shopping Cart</p>
            <p className="text-sm text-primary font-semibold">{collectCartItemsCount()} Items</p>
          </div>
          {/* Table */}
          <div className="flex flex-col gap-7">
            {/* Head */}
            <div className="grid grid-cols-[3fr_1fr_1fr] text-gray-700 font-medium">
              <p>Products Details</p>
              <p>Subtotal</p>
              <p className="text-center">Action</p>
            </div>
            {/* Body */}
            <div className="flex flex-col gap-4">
              {
                productsCart.map((product, index) => (
                  <div key={index} className="grid grid-cols-[3fr_1fr_1fr] items-center">
                    {/* Product Details */}
                    <div className="flex items-center gap-5">
                      <img onClick={() => { navigate(`/products/${product.category}/${product._id}`); scrollTo(0, 0); }} src={product.image[0]} alt="product-image" className="w-16 h-16 md:w-24 md:h-24 border border-gray-400 rounded-md cursor-pointer" />
                      <div>
                        <p className="text-base md:text-xl text-gray-600 font-semibold">{product.name}</p>
                        <p className="text-gray-600">Weight: N/A</p>
                        <div className="flex items-center text-gray-600">
                          <p>Qty:</p>
                          <select value={product.quantity} onChange={(event) => { updateCartItem(product._id, Number(event.target.value)); }}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                            <option value={9}>9</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* Subtotal */}
                    <p className="text-gray-600 font-medium">{currency}{calculateProductDiscount(product.price, product.offerPrice) * product.quantity}</p>
                    {/* Action */}
                    <div className="flex justify-center">
                      <p onClick={() => { removeFromCart(product._id); }} className="w-5 h-5 flex items-center justify-center text-red-800 border-2 border-red-800 p-1 cursor-pointer rounded-full">X</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          {/* Continue To Shopping */}
          <div onClick={() => { navigate("/products"); scrollTo(0, 0); }} className="group flex items-center gap-2 mt-6 text-primary cursor-pointer bg-gray-100 w-fit">
            <FaArrowLeftLong className="group-hover:-translate-x-1" />
            <p>Continue Shopping</p>
          </div>
        </div>


        {/* Right Side Order Summary */}
        <div className="w-full md:w-[400px] md:min-w-[360px]">
          <div className="bg-gray-100 rounded-md p-5">
            {/* Title */}
            <div className="mb-5">
              <p className="text-2xl text-gray-700 font-semibold">Order Summary</p>
              <hr className="border-none h-[1px] w-full bg-gray-400 mt-5" />
            </div>
            {/* Address */}
            <div>
              <h2 className="mb-3 text-[18px] font-medium">Delivery Address</h2>
              <div className="flex items-center gap-4 justify-between">
                <p className="text-sm text-gray-600 font-medium">{addressSelected ? `${addressSelected.street}, ${addressSelected.city}, ${addressSelected.country}, ${addressSelected.state}` : "No Address Found"}</p>
                <button onClick={() => { setShowAddress(!showAddress); }} className="text-primary font-semibold">Change</button>
              </div>
              {
                showAddress &&
                <div className="mt-5 bg-white border border-gray-300 py-1">
                  {
                    address ? address.map((item, index) => (
                      <p key={index} onClick={() => { setAddressSelected(item); showAddress(false); }}
                        className="py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 block w-full text-left">
                        {`${item.street}, ${item.city}, ${item.country}, ${item.state}`}
                      </p>
                    ))
                      :
                      <p className="py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 block w-full text-left">
                        No Address Found
                      </p>
                  }
                  <button onClick={() => { navigate("/add-address"); }} className="py-2 px-3 text-sm text-primary hover:bg-gray-100 block w-full text-center">Add Address</button>
                </div>
              }
            </div>
            {/* Payment */}
            {showAddress ? null :
              <div className="mt-5">
                <h2 className="mb-3 text-[18px] font-medium">Payment Method</h2>
                <select value={paymentMethod} onChange={(event) => { setPaymentMethod(event.target.value); }} className="block w-full py-2 px-3 border border-gray-300 rounded-sm outline-none">
                  <option value={"COD"}>Cash On Delivery</option>
                  <option value={"Online"}>Online Payment</option>
                </select>
              </div>
            }
            {/* Seperator */}
            <hr className="border-none h-[1px] w-full bg-gray-400 mt-5 mb-5" />
            {/* Price */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 justify-between text-gray-600 font-medium">
                <p>Price</p>
                <p>{currency}{productsCartAmount()}</p>
              </div>
              <div className="flex items-center gap-3 justify-between text-gray-600 font-medium">
                <p>Shipping Fee</p>
                <p className="text-primary">Free</p>
              </div>
              <div className="flex items-center gap-3 justify-between text-gray-600 font-medium">
                <p>Tax(2%)</p>
                <p>{currency}{(productsCartAmount() * (2 / 100)).toFixed(1)}</p>
              </div>
              <div className="flex text-[18px] items-center gap-3 justify-between text-gray-600 font-semibold">
                <p>Total Amount:</p>
                <p>{currency}{productsCartAmount() + (productsCartAmount() * (2 / 100))}</p>
              </div>
            </div>
            {/* Button */}
            <button onClick={placeOrder} className="py-2.5 px-4 bg-primary text-white block w-full  mt-5 transition-all duration-300 hover:bg-green-700">
              {
                paymentMethod === "COD" ? "Place Order" : "Proceed To Checkout"
              }
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;