import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductItem({ product }) {
  const { cartItems, addToCart, removeFromCart, calculateProductDiscount, currency } = useContext(AppContext);
  const starsCount = [1, 2, 3, 4];


  return (
    <div className="p-4 border border-gray-300 rounded-md">
      {/* Image */}
      <img src={product.image[0]} alt="product-image" className="transition-all duration-300 hover:scale-110 cursor-pointer" />
      {/* Content */}
      <div className="flex flex-col gap-1">
        {/* Category */}
        <p className="text-xs text-gray-600 font-medium">{product.category}</p>
        {/* Name */}
        <p className="text-[18px] text-gray-700 font-semibold">{product.name}</p>
        {/* Stars */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            {starsCount.map((start, index) => (<img src={assets.star_icon} key={index} alt="star-icon" className="w-3" />))}
            <img src={assets.star_dull_icon} alt="start-icon" className="w-3" />
          </div>
          <p>(4)</p>
        </div>
        {/* Price */}
        <div className="flex flex-col items-start gap-1">
          <p>Price: <span className="text-primary text-[18px] font-semibold">{currency}{calculateProductDiscount(product.price, product.offerPrice)}</span></p>
          <div className="flex items-center gap-3">
            <span className="text-red-700">-{product.offerPrice}%</span>
            <span className="line-through text-gray-700">{currency}{product.price}</span>
          </div>
        </div>
      </div>
      {/* Button Add To Cart And Quick View */}
      <div className="mt-2 flex flex-col gap-3">
        {
          cartItems[product._id]
            ?
            <div className="text-primary flex items-center gap-4 text-sm justify-center w-full bg-white py-1 px-3  rounded-md border-2 border-primary">
              <button
                onClick={() => { removeFromCart(product._id); }}
              ><FaMinus /></button>
              <p>{cartItems[product._id]}</p>
              <button
                onClick={() => { addToCart(product._id); }}
              ><FaPlus /></button>
            </div>
            :
            <button onClick={() => { addToCart(product._id); }} className="flex items-center gap-2 text-sm justify-center w-full bg-white py-1 px-3  rounded-md border-2 border-primary">
              <img src={assets.cart_icon} alt="cart-icon" className="w-4" />
              <span className="text-gray-700 font-semibold">Add To Cart</span>
            </button>
        }
        <Link to={`/products/${product.category}/${product._id}`} className="text-sm text-center justify-center w-full bg-white py-1 px-3  rounded-md border-2 border-primary text-gray-700 font-semibold">Quick View</Link>
      </div>

    </div>
  );
}

export default ProductItem;