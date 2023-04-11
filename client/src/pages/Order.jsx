import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/handle-orders.css";

function Order() {
  const [order, setOrder] = useState();
  const [items, setItems] = useState();
  const [customer, setCustomer] = useState();
  const [orderNumber, setOrderNumber] = useState();

  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const params = useParams();

  function goBack() {
    navigate("/orders");
  }

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`/api/orders/${params.id}`);
      setOrder(await response.json());
      console.log(order);
      console.log(response);
    };

    fetchItem();
  }, [params.id]);

  return (
    <div>
      <div className="row">
        <div className="cell">Customer Name</div>
        <div className="cell">Items ordered</div>
      </div>
      <div className="row">
        <div className="cell">{order?.name}</div>
        <div className="cell">{order?.items}</div>
      </div>
    </div>
  );
}
export default Order;
