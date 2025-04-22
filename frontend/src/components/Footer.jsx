import { Link } from "react-router-dom";
import { footerLinks } from "../assets/assets";
import { VscAzure } from "react-icons/vsc";

function Footer() {
  return (
    <div className="bg-[#e9f5f1] px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">
      {/* Footer Details */}
      <div className="pt-16 pb-10 flex flex-col md:flex-row items-start justify-between gap-5">
        {/* Head */}
        <div className="w-[55%]">
          <Link to={"/"} className="flex items-center gap-1 text-2xl lg:text-3xl font-semibold mb-5">
            <VscAzure className="text-primary" />
            <p>In<span className="text-primary">F</span>inite </p>
          </Link>
          <p className="text-[15px] text-gray-600 w-full md:w-[70%]">We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.</p>
        </div>
        {/* Links*/}
        {
          footerLinks.map((item, index) => (
            <div key={index} className="w-[15%] flex md:justify-center">
              <div>
                <h2 className="text-[18px] mb-5 font-semibold text-gray-800">{item.title}</h2>
                <ul className="flex flex-col gap-1 text-sm text-gray-600">
                  {
                    item.links.map((link, index) => (
                      <Link to={"/"} key={index}>{link.text}</Link>
                    ))
                  }
                </ul>
              </div>
            </div>
          ))
        }

      </div>


      {/* Copy Right */}
      <div className="py-2 font-medium text-center border-t border-gray-400 text-sm text-gray-800">
        <p>Copyright {new Date().getFullYear()} &copy; MostafaYassin.dev All Rights Reserved</p>
      </div>

    </div>
  );
}

export default Footer;