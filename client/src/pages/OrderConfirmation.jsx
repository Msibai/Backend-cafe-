import "../style/order-confirmation.css";
import { useNavigate } from "react-router-dom";
import Gradient from "../images/gradient.jpg";

function OrderConfirmation() {
  const navigate = useNavigate();

  function goBack() {
    navigate("/menu");
  }

  // Call goBack after a delay of 5 seconds
  setTimeout(goBack, 5000);

  return (
    <div
      className="background-image"
      style={{ backgroundImage: `url(${Gradient})` }}
    >
      <div>
        <h1 className="order-placed">Your order has been placed!</h1>
      </div>
    </div>
  );
}

export default OrderConfirmation;
