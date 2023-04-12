import "../style/order-confirmation.css";
import { useNavigate } from "react-router-dom";

function OrderConfirmation() {
  const navigate = useNavigate();

  function goBack() {
    navigate("/menu");
  }

  // Call goBack after a delay of 5 seconds
  setTimeout(goBack, 5000);

  return (
    <div>
      <h1 className="order-placed">Your order has been placed!</h1>
    </div>
  );
}

export default OrderConfirmation;
