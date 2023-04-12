import "../style/order-confirmation.css";
import { useNavigate } from "react-router-dom";
import Gradient from "../images/gradient.jpg";

function OrderConfirmation() {
  const navigate = useNavigate();

  function goBack() {
    navigate("/menu");
  }

  setTimeout(goBack, 3000);

  return (
    <div
      className="background-image"
      style={{ backgroundImage: `url(${Gradient})` }}
    >
      <div className="order-confirmation-container">
        <h1 className="order-placed">Your order has been placed!</h1>
      </div>
    </div>
  );
}

export default OrderConfirmation;
