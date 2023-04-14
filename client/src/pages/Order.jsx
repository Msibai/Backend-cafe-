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

  
  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(`/api/orders/${location.state.data}`);
      const data =(await response.json());
	  console.log(data)
	  setOrder(data);

    };

    fetchOrder();
  }, [location.state.data]);


  const changeStatus = async (newStatus) => {
    try {
      const deletion = await fetch(`/api/orders/${location.state.data}`, {
        method: "put",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(newStatus),
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
console.log(order)

  if (!order) {
	return <h2>🌀 Loading...Mongoose...Is...So...Slow</h2>;
}
  return (
    <div>
      <div className="handle-orders-table">
        <div className="row">
          <div className="cell">Order ID</div>
          <div className="cell">Customer ID</div>

          <div className="cell">Items ordered</div>
        </div>
        <div className="row">
          { <div className="cell">{order?.customer.name}, { order?.customer._id}</div> }
          <div className="cell">{order?._id}</div>
          {/* <div className="cell">{order?.items}</div>{" "} */}
        </div>
      </div>

      <button className="order-buttons" onClick={()=> { changeStatus({status:{Pending:false, Accepted:true}})}}>Accept order</button>
      <button className="order-buttons" onClick={()=> { changeStatus({status:{Pending:false, Declined:true}})}}>Deny order </button>
	  <button className="order-buttons" onClick={()=> { changeStatus({status:{Pending:false, Ready:true}})}}>Order is Ready </button>
	  <div>
		<label for = "pickupTime"> Pickup Time </label> <input id= "pickupTime" onChange={(e)=> {changeStatus({pickUpTime: e.target.value})}}></input>
	  </div>
    </div>
  );
}
export default Order;
