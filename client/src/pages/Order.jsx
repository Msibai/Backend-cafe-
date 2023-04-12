import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/handle-orders.css";

function Order() {
  const [order, setOrder] = useState();
  const [items, setItems] = useState();
  const [customer, setCustomer] = useState();
  const [orderNumber, setOrderNumber] = useState();

  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const location = useLocation();

  function AcceptOrder() {
    navigate("/orders");
  }

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`/api/orders/${location.state.data}`);
      setOrder(await response.json());
    };

    fetchItem();
  }, [location.state.data]);

  return (
    <div>
      <div className="handle-orders-table">
        <div className="row">
          <div className="cell">Order ID</div>
          <div className="cell">Customer ID</div>

          <div className="cell">Items ordered</div>
        </div>
        <div className="row">
          <div className="cell">{order?.customer}</div>
          <div className="cell">{order?._id}</div>
          <div className="cell">{order?.items.join(" ")}</div>{" "}
        </div>
      </div>

      <button className="order-buttons">Accept order</button>
      <button className="order-buttons">Deny order</button>
    </div>
  );
}
export default Order;
