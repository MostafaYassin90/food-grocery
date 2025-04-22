import Navbar from "./components/Navbar";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Deals from "./pages/Deals";
import CategoryPage from "./pages/CategoryPage";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import { ToastContainer } from 'react-toastify';
import Footer from "./components/Footer";
import { useContext, useState } from "react";
import { AppContext } from "./context/AppContext";
import Login from "./pages/Login";
import AddAddress from "./pages/AddAddress";
import Profile from "./pages/Profile";
import MyOrders from "./pages/MyOrders";
import Seller from "./pages/seller/Seller";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import SellerLogin from "./components/seller/SellerLogin";
import Verify from "./pages/Verify";

const App = () => {
  const { showSignIn, setShowSignIn } = useContext(AppContext);
  const isSellerPath = useLocation().pathname.includes("/seller");
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");

  return (
    <div className="app relative">
      {/* Start Add Seller Dashboard */}
      <div className="fixed top-[15%] z-[9999] bg-black rounded-tr-md rounded-br-md w-fit p-1 flex justify-center items-center">
        <Link to={"https://food-grocery-frontend.vercel.app/seller"}
          className="text-sm text-gray-50 text-center"
        >Admin <br />Dashboard</Link>
      </div>
      {/* End Add Seller Dashboard */}

      <ToastContainer position="top-center" theme="light" />
      {/* SignIn */}
      {showSignIn ? <Login /> : null}
      {/* SignIn */}
      {!isSellerPath && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/products/:category" element={<CategoryPage />} />
        <Route path="/products/:category/:productId" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add-address" element={<AddAddress />} />
        <Route path="/profile" element={<Profile setAToken={setAToken} />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/verify" element={<Verify />} />

        {/* Seller */}
        <Route path="/seller" element={aToken ? <Seller setAToken={setAToken} /> : <SellerLogin setAToken={setAToken} />}>
          <Route path="/seller" element={<AddProduct aToken={aToken} />} />
          <Route path="product-list" element={<ProductList aToken={aToken} />} />
          <Route path="orders" element={<Orders aToken={aToken} />} />
        </Route>



      </Routes>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
