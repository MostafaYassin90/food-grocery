import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from "axios";

function ProductList({ aToken }) {
  const { allProducts, getAllProducts, backend_url } = useContext(AppContext);
  const { calculateProductDiscount, currency } = useContext(AppContext);


  // Change In Stock Handler
  const changeInStock = async (productId) => {
    try {
      const response = await axios.post(backend_url + "/api/product/stock", { productId: productId }, {
        headers: { authorization: "Bearer " + aToken }
      });
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        getAllProducts();
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <div className="py-5 px-[5vw] w-full h-[calc(100vh-70px)] overflow-y-scroll">
      <h1 className="font-semibold mb-10">All Products</h1>

      {/* Show Products List */}
      <div className="border border-gray-300 rounded-md flex flex-col">

        {/* Head */}
        <div className="hidden sm:grid grid-cols-[3fr_1fr_1fr_1fr]  gap-3 py-3 px-3">
          <p>Product</p>
          <p>Category</p>
          <p>Selling Price</p>
          <p>In Stock</p>
        </div>

        {/* Body */}
        <div className='flex flex-col'>
          {
            allProducts.map((product, index) => (
              <div key={index} className='grid grid-cols-[3fr_1fr] sm:grid-cols-[3fr_1fr_1fr_1fr] gap-3 text-gray-600 items-center py-3 px-3 border-t border-gray-300'>

                {/* Product */}
                <div className='flex items-center gap-3'>
                  <img src={product.image[0]} alt='product-image' className='w-16 rounded-md border border-gray-300' />
                  <p className='text-gray-600'>{product.name}</p>
                </div>

                {/* Category */}
                <p>{product.category}</p>

                {/* Selling Price */}
                <p>{currency}{calculateProductDiscount(product.price, product.offerPrice)}</p>

                {/* InStock */}
                <label className="relative inline-flex items-center max-sm:justify-center cursor-pointer text-gray-900 gap-3">
                  <input type="checkbox" className="sr-only peer" defaultChecked={product.inStock}
                    onChange={() => { changeInStock(product._id); }} />
                  <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                  <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                </label>

              </div>
            ))
          }
        </div>

      </div>

    </div>
  );
}

export default ProductList;