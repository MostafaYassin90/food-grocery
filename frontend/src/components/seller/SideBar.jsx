import { NavLink, useLocation } from "react-router-dom";
import { assets } from '../../assets/assets';

function SideBar() {
  const path = useLocation().pathname;

  return (
    <div className="py-5 w-fit md:w-[250px] h-[calc(100vh-70px)] border-r border-gray-300">
      <ul className="flex flex-col">

        <NavLink to={"/seller"} className={`flex items-center gap-5 w-full py-3 px-[2vw] transition-all duration-300 hover:bg-gray-100 ${path === "/seller" ? "active-link" : ""}`}>
          <img src={assets.add_icon} className="w-8" />
          <p className="hidden md:block text-gray-700">Add Product</p>
        </NavLink>

        <NavLink to={"/seller/product-list"} className={`flex items-center gap-5 w-full py-3 px-[2vw] transition-all duration-300 hover:bg-gray-100 ${path === "/seller/product-list" ? "active-link" : ""}`}>
          <img src={assets.product_list_icon} className="w-8" />
          <p className="hidden md:block text-gray-700">Products List</p>
        </NavLink>

        <NavLink to={"/seller/orders"} className={`flex items-center gap-5 w-full py-3 px-[2vw] transition-all duration-300 hover:bg-gray-100 ${path === "/seller/orders" ? "active-link" : ""}`}>
          <img src={assets.order_icon} className="w-8" />
          <p className="hidden md:block text-gray-700">Orders</p>
        </NavLink>

      </ul>
    </div>
  );
}

export default SideBar;