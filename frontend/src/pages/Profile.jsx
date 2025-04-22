import { useContext } from "react";
import { AppContext } from './../context/AppContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { userData, setToken } = useContext(AppContext);
  const navigate = useNavigate();


  // LogoutHandler
  const logoutHandler = () => {
    window.localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };


  return userData && (
    <div className="relative py-10 min-h-[100vh] px-[3vw] sm:px-[4vw] md:px[5vw] lg:px-[7vw]">
      <div className="overflow-hidden rounded-md h-auto pb-5 absolute top-[40%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[90%] md:w-[400px]  bg-white border border-gray-200 shadow-md">
        {/* Image */}
        <div className="bg-gray-400 relative h-[70px]">
          <img src={userData.image} alt="user-image" className="block w-20 h-20 rounded-full border-2 bg-white border-gray-100 absolute bottom-[-50%] left-[50%] -translate-x-[50%]" />
        </div>
        {/* Name Email */}
        <div className="mt-10 p-5 flex flex-col gap-1">
          <p className="text-gray-700 font-medium">Username: <span>{userData.username}</span> </p>
          <p className="text-gray-700 font-medium">Email: <span>{userData.email}</span> </p>
          <p className="text-gray-700 font-medium text-sm">CreatedAt: {new Date(userData.createdAt).toLocaleDateString()}</p>
        </div>
        {/* Button */}
        <div className="mt-5 flex flex-row gap-4 p-5 ">
          <button onClick={() => { navigate("/products"); }} className="py-2 w-[180px] px-5 border rounded-sm border-gray-300 bg-gray-100 text-gray-700 font-medium text-sm transition-all duration-300 hover:bg-gray-200">Explore Our Store</button>
          <button onClick={logoutHandler} className="py-2 w-[180px] px-5 border rounded-sm border-black font-medium text-sm bg-[#171717] text-white transition-all duration-300 hover:bg-gray-700">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;