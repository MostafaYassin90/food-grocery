import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

function SellerLogin({ setAToken }) {
  const { backend_url } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // On Submit Handler
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("The Required Data Is Missing.");
      return null;
    }
    try {
      const adminDetails = {
        email: email,
        password: password
      };
      const response = await axios.post(backend_url + "/api/user/admin-login", adminDetails);
      if (response.data.success) {
        window.localStorage.setItem("aToken", response.data.admin.token);
        setAToken(response.data.admin.token);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <div className="h-[100vh] flex flex-col gap-5 items-center justify-center bg-gray-100">
      {/* Show Email And Password */}
      <div className="w-full md:w-[450px] bg-white border border-gray-400 p-2 rounded-md flex flex-col gap-2 justify-center items-center">
        <b className="text-gray-600">Email: admin@gmail.com</b>
        <b className="text-gray-600">Password: admin123</b>
      </div>


      <div className="w-full md:w-[450px] bg-white border border-gray-400 p-5 rounded-md">
        <h1 className="text-2xl mb-10 font-semibold text-center">
          <span className="text-primary">Admin</span> Login
        </h1>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">

          <div>
            <label className="block ml-1 mb-1 text-gray-700">Email</label>
            <input value={email} onChange={(event) => { setEmail(event.target.value); }}
              type="text" placeholder="Type Here" required
              className="block w-full py-2.5 px-3 border border-gray-400 rounded-md outline-none"
            />
          </div>

          <div>
            <label className="block ml-1 mb-1 text-gray-700">Password</label>
            <input value={password} onChange={(event) => { setPassword(event.target.value); }}
              type="password" placeholder="Type Password" required
              className="block w-full py-2.5 px-3 border border-gray-400 rounded-md outline-none"
            />
          </div>

          {/* Button */}
          <button type="submit" className="block w-full mt-3 bg-primary text-white py-2 rounded-md transition-all duration-300 hover:bg-green-600 px-3 text-center font-medium">Login</button>

        </form>

      </div>
    </div>
  );
}

export default SellerLogin;