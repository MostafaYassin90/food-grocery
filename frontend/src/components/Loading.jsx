import { FaSpinner } from "react-icons/fa";
import { PiSpinnerBold } from "react-icons/pi";

function Loading() {
  return (
    <div className="loading">
      <PiSpinnerBold className="spin" />
    </div>
  );
}

export default Loading;