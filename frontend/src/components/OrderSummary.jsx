import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function OrderSummary({ addressSelected, address, paymentMethod, setAddressSelected, setPaymentMethod }) {
  const [showAddress, setShowAddress] = useState(false);
  const { productsCartAmount, currency } = useContext(AppContext);


  const navigate = useNavigate();


  return (
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
            <option option={"COD"}>Cash On Delivery</option>
            <option option={"Online"}>Online Payment</option>
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
      {
        paymentMethod === "COD"
          ?
          <button className="py-2.5 px-4 bg-primary text-white block w-full  mt-5 transition-all duration-300 hover:bg-green-700">Place Order</button>
          :
          <button className="py-2.5 px-4 bg-primary text-white block w-full  mt-5 transition-all duration-300 hover:bg-green-700" onClick={() => { toast.info("Stripe Is Disable In Demo"); }}>Proceed To Checkout</button>
      }


    </div>
  );
}

export default OrderSummary;