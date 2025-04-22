import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import ProductItem from './ProductItem';
import { Link } from "react-router-dom";

function RelatedProducts({ category }) {
  const { allProducts } = useContext(AppContext);
  const [relatedProducts, setRelatedProducts] = useState([]);


  // Get Related Products
  const getRelatedProducts = () => {
    const productsData = allProducts.slice();
    let relatedProductsData = [];
    productsData.map((product) => {
      if (product.category === category) {
        relatedProductsData.push(product);
      }
    });
    setRelatedProducts(relatedProductsData);
  };

  useEffect(() => {
    getRelatedProducts();
  }, [category, allProducts]);


  return (
    <div className="my-20">
      {/* Title */}
      <div className="w-fit mx-auto">
        <p className="text-2xl font-semibold text-gray-700">Related Products</p>
        <hr className="border-none h-[2px] mt-1 w-[50%] bg-primary mx-auto" />
      </div>
      {/* Show Products */}
      <div className="grid grid-cols-auto-item gap-6 mt-10">
        {
          relatedProducts.slice(0.5).map((product, index) => (
            <ProductItem product={product} key={index} />
          ))
        }
      </div>
      {/* Show More */}
      <div className="mt-10">
        <Link to={"/products"} className="py-3 px-10 rounded-md text-primary text-sm border transition-all duration-300 hover:bg-primary hover:text-white border-primary mx-auto block w-fit"
          onClick={() => { scrollTo(0, 0); }}>Show More</Link>
      </div>

    </div>
  );
}

export default RelatedProducts;