import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/handle-orders.css";

function Order() {
  const [order, setOrder] = useState({});
  const [items, setItems] = useState();
  const [customer, setCustomer] = useState();
  const [orderNumber, setOrderNumber] = useState();

  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location.state.data);

  function AcceptOrder() {
    navigate("/orders");
  }

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(`/api/orders/${location.state.data}`);
      const data =(await response.json());
	  console.log(data)
	  setOrder(data);

    };

    fetchOrder();
  }, [location.state.data]);

  const deleteOrder = async (event) => {
     event.preventDefault();
    try {
      const deletion = await fetch(`/api/orders/${location.state.data}`, {
        method: "delete",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(order),
      });

      const result = await deletion.json();
      console.log(deletion);

      if (result.error) {
        setErr(result.error);
      } else {
        setErr(result.message);
        console.log(err);
      }
    } catch (error) {
      console.log(result);
    }
  };

  return (
    <div>
      <div className="handle-orders-table">
        <div className="row">
          <div className="cell">Order ID</div>
          <div className="cell">Customer ID</div>

          <div className="cell">Items ordered</div>
        </div>
        <div className="row">
          {/* <div className="cell">{order?.customer}</div> */}
          <div className="cell">{order?._id}</div>
          {/* <div className="cell">{order?.items}</div>{" "} */}
        </div>
      </div>

      <button className="order-buttons">Accept order</button>
      <button className="order-buttons" onClick={deleteOrder}>Deny order </button>
    </div>
  );
}
export default Order;
