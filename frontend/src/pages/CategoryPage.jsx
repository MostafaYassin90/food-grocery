import { useParams } from "react-router-dom";
import { categories } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
import { AppContext } from "../context/AppContext";

function CategoryPage() {
  const { allProducts } = useContext(AppContext);
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryData, setCategoryData] = useState(null);

  // Get Products Of Category
  const getProductsByCategory = () => {
    let productsData = [];
    allProducts.map((product) => {
      if (product.category === category) {
        productsData.push(product);
      }
    });
    setProducts(productsData);
  };

  // Get Category Data
  const getCategoryData = () => {
    const findCategory = categories.find((cat) => cat.path === category);
    setCategoryData(findCategory);
  };

  useEffect(() => {
    getProductsByCategory();
    getCategoryData();
  }, [category]);

  return (
    <div className="py-10 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">
      {/* Title */}
      {
        categoryData &&
        <div className="text-2xl font-semibold text-gray-700 w-fit uppercase">
          <p>{categoryData.text}</p>
          <hr className="w-[30%] h-[2px] border-none bg-primary ms-auto mt-[2px]" />
        </div>
      }
      {/* Show Products */}
      <div className="grid grid-cols-auto-item mt-10 gap-10">
        {
          products.length > 0 ?
            products.map((product, index) => (
              <ProductItem product={product} key={index} />
            ))
            :
            <div className="flex items-center justify-center min-h-[60vh]">
              <p className="text-3xl text-gray-700 font-semibold">No Products Found In This Category.</p>
            </div>
        }
      </div>
    </div>
  );
}

export default CategoryPage;