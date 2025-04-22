import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from './../context/AppContext';
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

function SingleProduct() {
  const { allProducts, calculateProductDiscount, currency, addToCart } = useContext(AppContext);
  const { category, productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const startsCount = [1, 2, 3, 4];
  const navigate = useNavigate();

  // Get Single Product
  const getSingleProduct = () => {
    const productsData = allProducts.slice();
    const findProduct = productsData.find((item) => item._id === productId);
    setProduct(findProduct);
    if (findProduct) {
      setMainImage(findProduct.image[0]);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [productId, allProducts]);

  console.log(product);

  return product && (
    <div className="py-20 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">
      {/* title */}
      <div>
        <span>{`Home / products / ${category} / `}</span>
        <span className="font-semibold text-primary mb-10">{product.name}</span>
      </div>
      {/* Product Details */}
      <div className="flex items-start gap-5 mt-10">

        {/* Left Side */}
        <div className="flex-1 flex items-start gap-4">
          <div className="w-[19%] flex flex-col gap-3">
            {
              product.image.map((img, index) => (
                <div className="group" key={index}>
                  <img onClick={() => { setMainImage(img); }} src={img} alt="product-image"
                    className={`w-[100%] max-w-[100%] transition-all duration-300 hover:bg-gray-100 cursor-pointer border border-gray-400 rounded-md ${img === mainImage ? "bg-gray-100" : ""}`} />
                </div>
              ))
            }
          </div>
          <div className="w-full">
            <img src={mainImage} alt="product-image" className="border border-gray-400 rounded-md" />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col gap-4">

          <div>
            {/* Title */}
            <h2 className="text-3xl font-semibold text-gray-700">{product.name}</h2>
            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {startsCount.map((_, index) => (
                  <img src={assets.star_icon} alt="start_icon" className="w-[14px]" key={index} />
                ))}
                <img src={assets.star_dull_icon} alt="start_icon" className="w-[14px]" />
              </div>
              <p>(4)</p>
            </div>
          </div>

          {/* Price */}
          <div>
            <p className="text-xl text-gray-600 font-semibold">Price: <span className="text-primary">{currency}{calculateProductDiscount(product.price, product.offerPrice)}</span></p>
            <div className="flex items-center gap-3">
              <span className="text-red-600 text-xl">-{product.offerPrice}</span>
              <span className="text-xl text-gray-600 font-semibold line-through">Price: {currency}{product.price}</span>
            </div>
            <p className="text-sm text-gray-600">(inclusive of all taxes)</p>
          </div>

          {/* About  */}
          <div>
            <p className="text-gray-700 mb-1 font-semibold">About Product</p>
            <ul className="list-disc pl-4 text-sm text-gray-600 flex flex-col gap-1 font-medium">
              {
                product.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              }
            </ul>
          </div>

          {/* Button Add To Cart & Buy Now */}
          <div className="flex items-center gap-3 mt-6">
            <button onClick={() => { addToCart(product._id); }} className="flex-1 block py-3 border border-gray-200 px-5 rounded-md text-center bg-gray-100 transisiotn-all duration-300 hover:bg-gray-300">Add To Cart</button>
            <button onClick={() => { addToCart(product._id); navigate("/cart"); scrollTo(0, 0); }} className="flex-1 block py-3 border border-green-600 px-5 rounded-md text-center bg-green-500 text-white transisiotn-all duration-300 hover:bg-green-700">Buy Now</button>
          </div>

        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={product.category} />

    </div>
  );
}

export default SingleProduct;