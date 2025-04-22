import { useContext } from "react";
import { AppContext } from './../context/AppContext';
import ProductItem from './ProductItem';

function BestSeller() {
  const { allProducts } = useContext(AppContext);

  return (
    <div className="pb-20">
      <h2 className="text-2xl mb-5 font-semibold text-gray-700">Best Seller</h2>
      {/* Show Products */}
      <div className="grid grid-cols-auto-item gap-10">
        {allProducts.filter((product) => product.inStock).slice(0, 5).map((product, index) => (
          <ProductItem product={product} key={index} />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;