import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import axios from "axios";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

function Verify() {
  const { backend_url } = useContext(AppContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();


  const verifyOrder = async () => {
    try {
      const response = await axios.post(backend_url + "/api/order/verify", {
        success: success,
        orderId: orderId
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/my-orders");
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };
  useEffect(() => {
    verifyOrder();
  }, []);

  return (
    <div className="relative h-[90vh]">
      <Loading />
    </div>
  );
}

export default Verify;