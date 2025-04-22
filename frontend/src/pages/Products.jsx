import { useContext, useEffect, useState } from "react";
import { AppContext } from './../context/AppContext';
import ProductItem from './../components/ProductItem';

function Products() {
  const { allProducts, searchQuery } = useContext(AppContext);
  const [filteringProduts, setFilteringProducts] = useState([]);


  // Apply Filtering Products
  const applyFilteringProducts = () => {
    let productsClone = allProducts.slice();

    if (searchQuery.length > 0) {
      productsClone = productsClone.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteringProducts(productsClone);
  };

  useEffect(() => {
    applyFilteringProducts();
  }, [searchQuery, allProducts]);


  return (
    <div className="py-10 min-h-[100vh] mx-[3vw] sm:px-[4vw] md:[5vw] lg:px-[7vw]">
      {/* Title */}
      <div className="flex flex-col gap-1 mb-10 w-fit">
        <p className="text-3xl text-gray-700 font-semibold">All Products</p>
        <hr className="border-none h-[2px] w-[50%] bg-primary ms-auto" />
      </div>
      <div className="grid grid-cols-auto-item gap-5">
        {
          filteringProduts.map((product, index) => (
            <ProductItem product={product} key={index} />
          ))
        }
      </div>
    </div>

  );
}

export default Products;