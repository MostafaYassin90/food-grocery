import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { IoMdClose } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { GoEyeClosed } from "react-icons/go";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Login() {
  const [state, setState] = useState("login");
  const { showSignIn, setShowSignIn, backend_url, setToken } = useContext(AppContext);
  const [passwordData, setPasswordData] = useState("password");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  // Show Password Handler
  const showPasswordHandler = () => {
    if (passwordData === "password") {
      setPasswordData("text");
    } else {
      setPasswordData("password");
    }
  };

  // Schema
  const signUpSchema = z.object({
    username: z.string({ required_error: "Username Is Required." }).min(2, { message: "Username Must Be At Least 2 Characters." }).max(100),
    email: z.string({ required_error: "Email Is Required." }).email({ message: "Please Enter a Valid Email" }),
    password: z.string({ required_error: "Password Is Required." }).min(6, { message: "Password Must Be At Least Characters." }).max(200)
  });
  const loginSchema = z.object({
    email: z.string({ required_error: "Email Is Required." }).email({ message: "Please Enter a Valid Email" }),
    password: z.string({ required_error: "Password Is Required." }).min(6, { message: "Password Must Be At Least Characters." }).max(200)
  });

  const currentSchema = state === "login" ? loginSchema : signUpSchema;

  // Registet Hook Form
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
    resolver: zodResolver(currentSchema)
  });


  // onSubmitHandler
  const onSubmitHandler = async (data) => {
    if (state !== "login") {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("image", image);
      const response = await axios.post(backend_url + "/api/user/sign-up", formData);
      if (response.data.success) {
        window.localStorage.setItem("token", response.data.user.token);
        setToken(response.data.user.token);
        toast.success(response.data.message);
        navigate("/");
        setShowSignIn(false);
      }

    } else {

      const userDetails = {
        email: data.email,
        password: data.password
      };
      console.log(userDetails);
      const response = await axios.post(backend_url + "/api/user/login", userDetails);
      if (response.data.success) {
        console.log(response);
        window.localStorage.setItem("token", response.data.user.token);
        setToken(response.data.user.token);
        toast.success(response.data.message);
        navigate("/");
        setShowSignIn(false);
      }
    }

  };

  useEffect(() => {
    if (showSignIn) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, []);


  return (
    <div onClick={() => { setShowSignIn(false); }} className="px-[3vw] fixed z-[9999] bg-[#0c0c0c99] w-full h-full flex items-center justify-center">
      <div onClick={(e) => { e.stopPropagation(); }} className="relative w-full md:w-[450px] bg-white border border-gray-400 rounded-md p-5">
        {/* Title */}
        <h2 className="text-xl my-8 font-semibold text-center">
          <span className="text-primary">User </span>
          <span className="text-gray-700">{state}</span>
        </h2>
        {/* Close */}
        <div onClick={() => { setShowSignIn(false); }} className="absolute top-0 right-0 flex items-center gap-1 bg-red-700 text-white px-3 py-1 cursor-pointer transition-all duration-300 hover:bg-red-800 rounded-tr-md rounded-bl-md">
          <p>Close</p>
          <IoMdClose />
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmitHandler)} className="flex flex-col gap-5">
          {/* Username */}
          {
            state !== "login" &&
            <div>
              <label htmlFor="name" className="block w-full text-gray-700 text-[15pxs] ml-1 mb-1 font-semibold">Name</label>
              <input type="text" placeholder="Type Here" {...register("username")}
                id="name" className="block w-full border border-gray-400 rounded-md py-2 px-3 outline-primary" />
              {errors.username && <p className="text-[15px] font-medium text-red-700 ml-1 mt-1">{errors.username.message}</p>}
            </div>
          }
          {/* Email */}
          <div>
            <label htmlFor="email" className="block w-full text-gray-700 text-[15pxs] ml-1 mb-1 font-semibold">Email</label>
            <input type="email" placeholder="Type Here" id="email" {...register("email")}
              className="block w-full border border-gray-400 rounded-md py-2 px-3 outline-primary" />
            {errors.email && <p className="text-[15px] font-medium text-red-700 ml-1 mt-1">{errors.email.message}</p>}
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="block w-full text-gray-700 text-[15pxs] ml-1 mb-1 font-semibold">Password</label>
            <div className="relative">
              <input type={passwordData} placeholder="Type Here" id="password" {...register("password")}
                className="block w-full border border-gray-400 rounded-md py-2 px-3 outline-primary" />
              {passwordData === "password"
                ?
                <IoEyeOutline onClick={showPasswordHandler} className="absolute top-[50%] -translate-y-[50%] right-[20px] cursor-pointer" />
                :
                <GoEyeClosed onClick={showPasswordHandler} className="absolute top-[50%] -translate-y-[50%] right-[20px] cursor-pointer" />
              }
            </div>
            {errors.password && <p className="text-[15px] font-medium text-red-700 ml-1 mt-1">{errors.password.message}</p>}
          </div>
          {/* Image */}
          {
            state !== "login" &&
            <div>
              <p className="block w-full text-gray-700 text-[15pxs] ml-1 mb-1 font-semibold">Upload Image [optional]</p>
              <label htmlFor="image" className="h-[70px] flex items-center justify-center cursor-pointer w-full border border-gray-400 rounded-md py-2 px-3 outline-primary">
                {
                  image
                    ?
                    <div>
                      <img src={URL.createObjectURL(image)} alt="user-image" className="w-14 h-14 rounded-full border-primary border-2" />
                    </div>
                    :
                    <div className="flex flex-col items-center w-full text-center">
                      <FaCloudUploadAlt className="text-4xl text-[#0075ff]" />
                      <p className="text-sm font-semibold text-gray-600">Upload</p>
                    </div>
                }
                <input type="file" id="image" hidden onChange={(event) => { setImage(event.target.files[0]); }} />
              </label>
            </div>
          }
          <button type="submit" className="bg-primary text-white py-2 px-3 rounded-md transition-all duration-300 hover:bg-green-700">{state === "login" ? "Login" : "Create Account"}</button>
        </form>
        {/* Switch Bewteen Login & Sign up */}
        <div className="mt-5">
          {
            state === "login"
              ?
              <p className="text-gray-700 text-sm font-medium">Create an Account? <span onClick={() => { setState("sign up"); }} className="font-semibold text-base text-[#0075ff] underline cursor-pointer">Sign up</span> </p>
              :
              <p className="text-gray-700 text-sm font-medium">Already Have Account? <span onClick={() => { setState("login"); }} className="font-semibold text-base text-[#0075ff] underline cursor-pointer">Login</span> </p>
          }
        </div>
      </div>
    </div>
  );
}

export default Login;