import { v2 as cloudinary } from "cloudinary";
import ProductModel from "../models/productModel.js";

/* ---------- Add Product  ---------- */
const addProduct = async (req, res) => {
  const { name, description, category, price, offerPrice } = await req.body;
  const images = await req.files; // image1 image2 image3  image4
  try {
    // Validattion
    if (!name || !description || !category || !price || !offerPrice) {
      return res.status(400).json({ success: false, message: "The Required Data Is Missing." });
    }
    const image1 = images.image1 && images.image1[0];
    const image2 = images.image2 && images.image2[0];
    const image3 = images.image3 && images.image3[0];
    const image4 = images.image4 && images.image4[0];
    if (!image1 && !image2 && !image3 && !image4) {
      return res.status(400).json({ success: false, message: "You Must Select At Least On Product Image." });
    }
    const arrOfImages = [image1, image2, image3, image4].filter((item) => {
      if (item !== undefined) {
        return item;
      }
    });
    // Upload Image In Cloudinary
    const images_url = await Promise.all(arrOfImages.map(async (image) => {
      try {
        const result = await cloudinary.uploader.upload(image.path, { resource_type: "image" });
        return result.secure_url;
      } catch (error) {
        console.log(error);
      }
    }));
    // Product Details 
    const productDetails = {
      name: name,
      description: JSON.parse(description),
      category: category,
      image: images_url,
      price: Number(price),
      offerPrice: Number(offerPrice)
    };
    // Create A New Product
    const newProduct = new ProductModel(productDetails);
    const product = await newProduct.save();
    return res.status(201).json({ success: true, product: product, message: "Product Added Successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ---------- Get All Product  ---------- */
const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    return res.status(200).json({ success: true, products: products });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


/* ---------- Get Single Product  ---------- */
const getSingleProducts = async (req, res) => {
  try {
    const { productId } = await req.body;

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product Not Found!" });
    }

    return res.status(200).json({ success: true, product: product });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ---------- CHange inStock  ---------- */
const changeStock = async (req, res) => {
  try {
    const { productId } = await req.body;
    const product = await ProductModel.findById(productId); // true
    if (!product) {
      return res.status(404).json({ success: false, message: "Product Not Found!" });
    }
    // Switch Stock
    await ProductModel.findByIdAndUpdate(productId, { inStock: !product.inStock });

    return res.status(200).json({ success: true, message: "Stock Updated" });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, getAllProducts, getSingleProducts, changeStock };