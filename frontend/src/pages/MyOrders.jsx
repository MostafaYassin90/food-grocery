import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

function MyOrders() {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, calculateProductDiscount, backend_url, token } = useContext(AppContext);


  // Get My Orders BasedOn Current User
  const getMyOrders = async () => {
    try {
      const response = await axios.get(backend_url + "/api/order/user", {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        setMyOrders(response.data.orders);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <div className="py-10 min-h-[100vh] px-[3vw] sm:px-[4vw] md:px[5vw] lg:px-[7vw]">
      {/* Title */}
      <div className="mb-16 text-2xl text-gray-700 font-semibold flex flex-col gap-1 w-fit uppercase">
        <p>My orders</p>
        <hr className="border-none h-[2px] w-[50%] bg-primary ms-auto" />
      </div>

      {/* Show Orders */}
      <div className="flex flex-col gap-10">
        {
          myOrders.map((order, index) => (
            <div className="p-4 border border-gray-400 rounded-md" key={index}>
              {/* Head */}
              <div className="grid sm:grid-cols-[3fr_1fr_1fr] gap-4 text-gray-600 font-medium mb-10">
                <p>OrderId: {order._id}</p>
                <p>Payment: {order.paymentType}</p>
                <p>TotalAmount: {currency}{order.amount}</p>
              </div>
              {/* Body */}
              <div className="flex flex-col gap-5">
                {/* Product */}
                {
                  order.items.map((item, index) => (
                    <div className={`grid sm:grid-cols-[3fr_1fr_1fr] gap-4 items-center ${order.items.length > 1 && order.items.length !== index + 1 ? "border-b border-gray-300" : ""} pb-5`} key={index}>
                      <div className="flex items-center gap-3">
                        <img src={item.image[0]} alt="product-image" className="w-20 h-20 bg-gray-200 rounded-md" />
                        <div>
                          <p className="text-xl text-gray-700 font-semibold">{item.name}</p>
                          <p className="text-base text-gray-500 font-medium">Category: {item.category}</p>
                        </div>
                      </div>
                      <div className="text-gray-600 font-medium">
                        <p>Quantity: {item.quantity}</p>
                        <p>Status: {order.status}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-[18px] text-primary font-semibold">Amount: {currency}{(calculateProductDiscount(item.price, item.offerPrice) * item.quantity)}</p>
                      </div>
                    </div>
                  ))
                }

              </div>

            </div>
          ))
        }
      </div>

    </div>
  );
}

export default MyOrders;