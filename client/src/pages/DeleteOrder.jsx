import { useParams, useNavigate , useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import Gradient from "../images/gradient.jpg";
import "../style/edit-menu.css";

function DeleteOrder() {

  const [order, setOrder] = useState();

  const [err, setErr] = useState("");
//   const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

//   function goBack() {
//     navigate("/orders");
//   }

//   useEffect(() => {
//     const fetchItem = async () => {
//       const response = await fetch(`/api/orders/${location.state.data}`);
//       const data = (await response.json());
//       console.log(data);
//     };

//     fetchItem();
//   }, [location.state.data]);

  const deleteItem = async () => {
    // event.preventDefault();
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
    <div
      className="background-image"
      style={{ backgroundImage: `url(${Gradient})` }}
    >
      <div className="page">
        <h1 className="edit-menu-item-title">Delete order</h1>
        {err != "" ? (
          <div className="error">
            {" "}
            <h2 className="update-menu-item-error">{err}</h2>
          </div>
        ) : (
          ""
        )}

        <form onSubmit={deleteItem} className="edit-menu-item-container">
          <div className="form-group">
            <h2 id="text" className="delete-text">
              Are you sure you want to delete{" "}
              <span id="item-id">{order?._id}</span>?
            </h2>
          </div>
          <button type="submit" className="submit-edit-button">
            Delete
          </button>
        </form>
        <button className="back-button" onClick={goBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default DeleteOrder;
