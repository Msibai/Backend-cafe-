import "../style/handle-orders.css";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

function OredersStatus() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Outlet />
      <h1 className="handle-orders-title">Handle Orders</h1>
      <div className="handle-orders-table">
        <div className="row">
          <div className="cell">Order Id</div>
        </div>
        {orders.map((order) => (
          <div key={order._id} className="row">
            <div className="cell">{order._id}</div>

            <Link to={`/orders/${order._id}`} state={{ data: order._id }}>
              <button className="handle-order-button">Handle order</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OredersStatus;
