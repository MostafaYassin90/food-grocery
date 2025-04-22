import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { FaArrowRight } from "react-icons/fa6";

function Hero() {
  return (
    <div className="relative mt-10">
      {/* Image */}
      <img src={assets.main_banner_bg} alt="banner-image" className="hidden md:block" />
      <img src={assets.main_banner_bg_sm} alt="banner-image" className="block md:hidden h-[1000px] w-full" />
      {/* Content */}
      <div className="absolute max-md:text-center max-md:bottom-[10%] max-md:left-[50%] max-md:-translate-x-[50%] md:top-[50%] md:-translate-y-[50%] md:left-[10%]">
        <h2 className="text-3xl lg:text-5xl font-semibold text-gray-700 mb-8 leading-tight">Freshness You Can <br /> Trust, Savings You <br /> will Love!</h2>
        <div className="flex items-center gap-5">
          <Link to={"/products"} className="transition-all duration-300 hover:bg-green-700 bg-primary text-white py-2 rounded-md px-7">Shop Now</Link>
          <Link to={"/deals"} className="flex group items-center gap-2 font-semibold text-gray-800">
            <p>Explore deals</p>
            <FaArrowRight className="mt-1 transition-all duration-300 group-hover:ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;