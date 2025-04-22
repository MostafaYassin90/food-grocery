import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { z } from "zod";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function AddAddress() {
  const { backend_url, token } = useContext(AppContext);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    street: "",
    zipCode: "",
    state: "",
    phone: ""
  });
  const navigate = useNavigate();

  // On Change Handler
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    }
  }, [token]);

  const schema = z.object({
    firstName: z.string({ required_error: "FirstName Is Requried" }).min(2, { message: "FirstName Must Be At Least 2 Characters." }).max(100),
    lastName: z.string({ required_error: "LastName Is Requried" }).min(2, { message: "LastName Must Be At Least 2 Characters." }).max(100),
    email: z.string({ required_error: "Email Is Requried" }).email({ message: "Please Type a Valid Email." }),
    country: z.string({ required_error: "Country Is Requried" }).min(2, { message: "Country Must Be At Least 2 Characters." }).max(100),
    city: z.string({ required_error: "city Is Requried" }).min(2, { message: "city Must Be At Least 2 Characters." }).max(100),
    street: z.string({ required_error: "street Is Requried" }).min(2, { message: "street Must Be At Least 2 Characters." }).max(100),
    zipCode: z.string({ required_error: "zipCode Is Requried" }).min(4, { message: "zipCode Must Be At Least 4 Characters." }).max(100),
    state: z.string({ required_error: "state Is Requried" }).min(2, { message: "state Must Be At Least 2 Characters." }).max(100),
    phone: z.string({ required_error: "phone Is Requried" }).min(9, { message: "phone Must Be At Least 9 Characters." }).max(100),
  });

  // On Submit Handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const validation = schema.safeParse(address);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return null;
    }
    try {
      const response = await axios.post(backend_url + "/api/user-address/add", address, {
        headers: { authorization: "Bearer " + token }
      });
      if (response.data.success) {
        navigate("/cart");
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }

  };


  return (
    <div className="py-10 min-h-[100vh] mx-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">
      {/* Title */}
      <h1 className="mb-12 text-3xl text-gray-600 font-semibold">Add Shipping <span className="text-primary">Address</span></h1>

      {/* Content */}
      <div className="flex flex-col-reverse md:flex-row items-start gap-10">

        {/* Left Side */}
        <form onSubmit={onSubmitHandler} className="w-full md:flex-1 flex flex-col gap-4">
          {/* FirstName & Last Name */}
          <div className="flex items-center justify-start gap-4">
            <input type="text" value={address.firstName} onChange={(event) => { onChangeHandler(event); }} name="firstName"
              placeholder="FirstName" className="block w-full py-2 px-3 border border-gray-300 outline-primary rounded-md" />
            <input type="text" value={address.lastName} onChange={(event) => { onChangeHandler(event); }} name="lastName"
              placeholder="LastName" className="block w-full py-2 px-3 border border-gray-300 outline-primary rounded-md" />
          </div>
          {/* Email */}
          <input type="email" value={address.email} onChange={(event) => { onChangeHandler(event); }} name="email"
            placeholder="Email address" className="block w-full py-2 px-3 border border-gray-300 outline-primary rounded-md" />
          {/* Street */}
          <input type="text" value={address.street} onChange={(event) => { onChangeHandler(event); }} name="street"
            placeholder="Street" className="block w-full py-2 px-3 border border-gray-300 outline-primary rounded-md" />
          {/* Country &  City */}
          <div className="flex items-center justify-start gap-4">
            <input type="text" value={address.country} onChange={(event) => { onChangeHandler(event); }} name="country"
              placeholder="Country" className="block w-full py-2 px-3 border border-gray-300 outline-primary rounded-md" />
            <input type="text" value={address.city} onChange={(event) => { onChangeHandler(event); }} name="city"
              placeholder="City" className="block w-full py-2 px-3 border border-gray-300 outline-primary rounded-md" />
          </div>
          {/* ZipCode & State */}
          <div className="flex items-center justify-start gap-4">
            <input type="text" value={address.zipCode} onChange={(event) => { onChangeHandler(event); }} name="zipCode"
              placeholder="ZipCode" className="block w-full py-2 px-3 border border-gray-300 outline-primary rounded-md" />
            <input type="text" value={address.state} onChange={(event) => { onChangeHandler(event); }} name="state"
              placeholder="State" className="block w-full py-2 px-3 border border-gray-300 outline-primary rounded-md" />
          </div>
          {/* Phone */}
          <input type="number" value={address.phone} onChange={(event) => { onChangeHandler(event); }} name="phone"
            placeholder="Phone" className="block w-full py-2 px-3 border border-gray-300 outline-primary rounded-md" />
          {/* Button Save */}
          <button type="submit" className="block w-full bg-primary text-white py-3 px-4 rounded-md mt-5 text-sm transition-all duration-300 hover:bg-green-700">SAVE ADDRESS</button>
        </form>

        {/* Right Side */}
        <div className="w-full md:flex-1 flex justify-center">
          <img src={assets.add_address_iamge} alt="address-image" className="w-[400px] max-w-[100%]" />
        </div>

      </div>
    </div>
  );
}

export default AddAddress;