import { useContext, useEffect, useState } from 'react';
import { assets } from './../../assets/assets';
import { AppContext } from './../../context/AppContext';
import { toast } from 'react-toastify';
import axios from "axios";

function Orders({ aToken }) {
  const { backend_url, currency } = useContext(AppContext);
  const [orders, setOrders] = useState([]);


  // Get All Orders [admin]
  const getAllOrders = async () => {
    try {
      const response = await axios.get(backend_url + "/api/order/list", {
        headers: { authorization: "Bearer " + aToken }
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };
  console.log(orders);

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className='py-5 px-[5vw] w-full h-[calc(100vh-70px)] overflow-y-scroll'>
      <h1 className='text-2xl font-semibold mb-10'>Orders List</h1>

      {/* Show Orders List */}
      <div className='flex flex-col gap-5'>
        {
          orders.map((order, index) => (
            <div key={index} className='border border-gray-400 p-5 rounded-md shadow-md grid grid-cols-[2fr_2fr] sm:grid-cols-[0.5fr_2fr_2fr_1fr_1fr] gap-4 items-center'>
              {/* Image */}
              <div className='max-sm:hidden'>
                <img src={assets.box_icon} alt='box-icon' className='w-12 h-12 md:w-16 md:h-16' />
              </div>
              {/* Product Details */}
              <div>
                {
                  order.items.map((item, index) => (
                    <p key={index} className='text-gray-800 font-medium max-sm:text-sm'>
                      {item.name}
                      <span className='text-primary'> x {item.quantity}</span>
                    </p>
                  ))
                }
              </div>
              {/* User Address */}
              <div className='text-gray-700 text-sm md:text-base'>
                <p>{order.address.firstName + " " + order.address.lastName}</p>
                <p>{order.address.street + ", " + order.address.city + ","}</p>
                <p>{order.address.state + ", " + order.address.zipcode + ","}</p>
                <p>{order.address.country}</p>
                <p>{order.address.phone}</p>
              </div>
              {/* Amount */}
              <div className='text-[18px] text-primary font-semibold'>{currency}{order.amount}</div>

              {/* Order Details Method & date & pending */}
              <div className='text-gray-700 text-sm md:text-base'>
                <p>Method: {order.paymentType}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Payment: {order.isPaid === false ? "Pending" : "Paid"}</p>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Orders;