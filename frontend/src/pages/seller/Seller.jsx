import { Link, Outlet } from "react-router-dom";
import SideBar from "../../components/seller/SideBar";
import { VscAzure } from "react-icons/vsc";

function Seller({ setAToken }) {


  const logoutHandler = () => {
    window.localStorage.removeItem("aToken");
    setAToken("");
  };

  return (
    <div className="h-[100vh] max-h-[100vh]">

      {/* NavBar */}
      <div className="py-4 px-[3vw] h-[70px] border-b border-gray-300  flex items-center justify-between gap-5">
        {/* Logo */}
        <Link to={"/"} className="flex items-center gap-1 text-2xl lg:text-3xl font-semibold">
          <VscAzure className="text-primary" />
          <p>In<span className="text-primary">F</span>inite </p>
        </Link>

        <div className="flex items-center gap-5">
          <p className="text-gray-600">Hi, Admin </p>
          <button onClick={logoutHandler} className="border border-gray-400 rounded-full py-1.5 px-4 bg-gray-100 transition-all duration-300 hover:bg-black hover:text-white">Logout</button>
        </div>
      </div>

      <div className="flex items-start">
        <SideBar />
        <Outlet />
      </div>

    </div>
  );
}

export default Seller;