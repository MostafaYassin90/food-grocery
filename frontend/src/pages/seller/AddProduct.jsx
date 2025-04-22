import { useContext, useRef, useState } from "react";
import { assets, categories } from "../../assets/assets";
import { toast } from 'react-toastify';
import axios from "axios";
import { AppContext } from './../../context/AppContext';

function AddProduct({ aToken }) {
  const { backend_url } = useContext(AppContext);
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState([]);
  const [category, setCategory] = useState("Select Category");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const eleRef = useRef();


  // On Submit Handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image1 && !image2 && !image3 && !image4) {
      toast.error("You Must Select At Least One Product Image");
      return null;
    }

    if (!name || !description || category === "Select Category" || !price || !offerPrice) {
      toast.error("The Required Details Is Missing.");
      return null;
    }

    const slugDesc = description.split(`\n`).map((item) => item.trim());

    // Collect Product Data 
    const formData = new FormData();
    formData.append("image1", image1);
    formData.append("image2", image2);
    formData.append("image3", image3);
    formData.append("image4", image4);
    formData.append("name", name);
    formData.append("description", JSON.stringify(slugDesc));
    formData.append("category", category);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);

    try {
      setLoading(true);
      const response = await axios.post(backend_url + "/api/product/add", formData, {
        headers: { authorization: "Bearer " + aToken }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setImage1("");
        setImage2("");
        setImage3("");
        setImage4("");
        setName("");
        setDescription("");
        setCategory("Select Category");
        setPrice("");
        setOfferPrice("");
        setLoading(false);
      }
    }
    catch (error) {
      setLoading(false);
      toast.error(error.response.data.message || error.message);
    }
    eleRef.current.scrollIntoView({ top: 0, left: 0 });
  };

  return (
    <div className="px-[5vw] w-full h-[calc(100vh-70px)] overflow-y-scroll" >
      <form onSubmit={onSubmitHandler} ref={eleRef} className="py-5 w-full md:w-[450px] lg:w-[600px] flex flex-col gap-5">
        {/* Upload Image */}
        <div>
          <p className="text-gray-800 font-medium mb-3">Product Image</p>
          <div className="flex items-center gap-2 sm:gap-4">
            <label htmlFor="image1" className="cursor-pointer">
              <img src={image1 ? URL.createObjectURL(image1) : assets.upload_area} alt="upload-area" className="w-16 h-16 sm:w-28 sm:h-24 bg-gray-100 boder border-gray-200" />
              <input type="file" id="image1" hidden onChange={(event) => { setImage1(event.target.files[0]); }} />
            </label>
            <label htmlFor="image2" className="cursor-pointer">
              <img src={image2 ? URL.createObjectURL(image2) : assets.upload_area} alt="upload-area" className="w-16 h-16 sm:w-28 sm:h-24 bg-gray-100 boder border-gray-200" />
              <input type="file" id="image2" hidden onChange={(event) => { setImage2(event.target.files[0]); }} />
            </label>
            <label htmlFor="image3" className="cursor-pointer">
              <img src={image3 ? URL.createObjectURL(image3) : assets.upload_area} alt="upload-area" className="w-16 h-16 sm:w-28 sm:h-24 bg-gray-100 boder border-gray-200" />
              <input type="file" id="image3" hidden onChange={(event) => { setImage3(event.target.files[0]); }} />
            </label>
            <label htmlFor="image4" className="cursor-pointer">
              <img src={image4 ? URL.createObjectURL(image4) : assets.upload_area} alt="upload-area" className="w-16 h-16 sm:w-28 sm:h-24 bg-gray-100 boder border-gray-200" />
              <input type="file" id="image4" hidden onChange={(event) => { setImage4(event.target.files[0]); }} />
            </label>
          </div>
        </div>
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-gray-800 font-medium mb-3">Product Name</label>
          <input value={name} onChange={(event) => { setName(event.target.value); }}
            type="text" id="name" placeholder="Type Here" className="block w-full py-2.5 px-3 border border-gray-300 outline-none rounded-md" />
        </div>
        {/* Product Description */}
        <div>
          <label htmlFor="description" className="block text-gray-800 font-medium mb-3">Product Description</label>
          <textarea value={description} onChange={(event) => { setDescription(event.target.value); }}
            type="text" id="description" placeholder="Type Here" className="block w-full py-2.5 px-3 border border-gray-300 outline-none rounded-md h-[150px] resize-none" />
        </div>
        {/* Product Category */}
        <div>
          <label htmlFor="category" className="block text-gray-800 font-medium mb-3">Product Category</label>
          <select id="category" value={category} onChange={(event) => { setCategory(event.target.value); }}
            className="block w-full py-2.5 px-3 border border-gray-300 outline-none rounded-md">
            <option value={"Select Category"} className="text-gray-700">Select Category</option>
            {
              categories.map((cat, index) => (
                <option key={index} value={cat.path}
                  className="text-gray-700"
                >{cat.path}</option>
              ))
            }
          </select>
        </div>

        {/* Price & Offer Price */}
        <div className="flex items-center gap-5">

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-gray-800 font-medium mb-3">Price</label>
            <input value={price} onChange={(event) => { setPrice(event.target.value); }}
              type="number" id="price" placeholder="Type Here" className="block w-full py-2.5 px-3 border border-gray-300 outline-none rounded-md" />
          </div>

          {/* Offer Price */}
          <div>
            <label htmlFor="offerPrice" className="block text-gray-800 font-medium mb-3">Offer Price</label>
            <input value={offerPrice} onChange={(event) => { setOfferPrice(event.target.value); }}
              type="number" id="offerPrice" placeholder="Type Here" className="block w-full py-2.5 px-3 border border-gray-300 outline-none rounded-md" />
          </div>
        </div>

        {/* Button */}
        <button disabled={loading ? true : false} type="submit" className={`bg-primary w-[140px] text-white py-2 px-5 rounded-md block ${loading ? "cursor-not-allowed opacity-70" : "transition-all duration-300 hover:bg-green-700"}`}>
          {
            loading ? <span>Loading ...</span> : "ADD Product"
          }

        </button>

      </form>
    </div>
  );
}

export default AddProduct;