import { VscAzure } from "react-icons/vsc";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from './../assets/assets';
import { IoSearch } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

function Navbar() {
  const { collectCartItemsCount, setShowSignIn, userData, token, setToken, searchQuery, setSearchQuery } = useContext(AppContext);
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate();

  // Logout Handler
  const logoutHandler = () => {
    window.localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  return (
    <div className="navbar relative py-4 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw] flex items-center justify-between gap-5  border-b border-gray-400">

      {/* Logo */}
      <Link to={"/"} className="flex items-center gap-1 text-2xl lg:text-3xl font-semibold">
        <VscAzure className="text-primary" />
        <p>In<span className="text-primary">F</span>inite </p>
      </Link>

      {/* Links & Searchbar & Cart and Login */}
      <div className="flex items-center max-lg:gap-4 gap-6">
        {/* Links */}
        <ul className="hidden md:flex items-center gap-3">
          <NavLink to={"/"} className="text-gray-800">Home</NavLink>
          <NavLink to={"/products"} className="text-gray-800">All Products</NavLink>
        </ul>
        {/* Search Bar */}
        <div className="hidden md:flex overflow-hidden rounded-full border border-gray-400 items-center w-[250px] h-[35px]">
          <input value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); }} type="text" placeholder="Search Products" className="outline-none w-full py-2 pl-3" />
          <button className="bg-primary flex w-fit px-2 h-full items-center justify-center">
            <IoSearch className="text-xl text-white" />
          </button>
        </div>
        {/* Crat & Login Button */}
        <div className="flex items-center max-lg:gap-3 gap-8">
          <Link to={"/cart"} className="relative">
            <BsCart3 className="text-gray-800 text-2xl font-semibold" />
            <p className="absolute top-[-10px] right-[-10px] text-sm font-medium w-5 h-5 flex items-center justify-center  text-white  rounded-full bg-primary">{collectCartItemsCount()}</p>
          </Link>
          {
            token && userData
              ?
              <div className="group relative z-50">
                <img src={userData.image} alt="image" className="w-8 h-8 rounded-full border-2 border-primary cursor-pointer" />
                <div className="hidden group-hover:block absolute pt-4 top-[100%] right-[-5px] w-[250px]">

                  <div className="bg-gray-100 border-2 border-primary rounded-md">

                    <div className="flex py-1 text-sm text-gray-800 font-medium flex-col gap-1 px-4 border-b border-gray-400">
                      <p>Username: {userData.username}</p>
                      <p>Email: {userData.email}</p>
                    </div>
                    <div className=" py-1 flex flex-col">
                      <Link to={"/profile"} className="py-1 px-4 transition-all duration-300 hover:bg-blue-200">Profile</Link>
                      <Link to={"/my-orders"} className="py-1 px-4 transition-all duration-300 hover:bg-blue-200">My Orders</Link>
                      <button onClick={logoutHandler} className="block text-left py-1 px-4 transition-all duration-300 hover:bg-blue-200">Logout</button>
                    </div>

                  </div>

                </div>
              </div>
              :
              <button onClick={() => { setShowSignIn(true); }} className="hidden md:block bg-primary text-white py-1.5 px-7 rounded-full">Login</button>
          }
        </div>
        {/* Show Menu */}
        <button className="ml-3 md:hidden" onClick={() => { setShowNavbar((prev) => !prev); }}>
          <img src={assets.menu_icon} alt="menu-icon" className="w-7" />
        </button>
      </div>

      {/* NavBar For Responsive */}
      <div className={`res-links absolute overflow-hidden transition-all duration-300 top-[101%] bg-white ${showNavbar ? "w-full right-0" : "w-0 right-[-30px]"} h-auto z-30 border-b border-gray-400 py-5 md:hidden`}>
        {/* Links */}
        <ul className="flex flex-col links">
          <NavLink to={"/"} onClick={() => { setShowNavbar(false); scrollTo(0, 0); }} className="text-gray-800 py-3 px-[3vw] sm:px[4vw]">Home</NavLink>
          <NavLink to={"/products"} onClick={() => { setShowNavbar(false); scrollTo(0, 0); }} className="text-gray-800 py-3 px-[3vw] sm:px[4vw]">All Products</NavLink>
          <NavLink to={"/contact"} onClick={() => { setShowNavbar(false); scrollTo(0, 0); }} className="text-gray-800 py-3 px-[3vw] sm:px[4vw]">Contact</NavLink>
        </ul>
        {
          token
            ?
            <button className="ml-[3vw] sm:ml-[4vw] mt-3 block bg-primary text-white py-1.5 px-7 rounded-full">Logout</button>
            :
            <button onClick={() => { setShowSignIn(true); }} className="hidden md:block bg-primary text-white py-1.5 px-7 rounded-full">Login</button>
        }
        {/* Login */}
      </div>

    </div>
  );
}

export default Navbar;