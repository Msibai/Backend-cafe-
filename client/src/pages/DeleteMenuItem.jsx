import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/edit-menu.css";

function DeleteMenuItem() {
  const [menuItem, setMenuItem] = useState();
  const [itemName, setItemName] = useState();

  const [err, setErr] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  function goBack() {
    navigate("/dashboard/updatemenu");
  }

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`/api/menus/${params.id}`);
      setMenuItem(await response.json());
      console.log(menuItem);
    };

    fetchItem();
  }, [params.id]);

  const deleteItem = async (event) => {
    event.preventDefault();
    try {
      const deletion = await fetch(`/api/menus/${params.id}`, {
        method: "delete",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(menuItem),
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
    <div className="page">
      <h1 className="edit-menu-item-title">Delete menu item</h1>
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
            <span id="item-id">{menuItem?.itemName}</span>?
          </h2>
        </div>
        <button type="submit" className="submit-edit-button">
          Delete
        </button>
      </form>
      <button onClick={goBack}>Back</button>
    </div>
  );
}

export default DeleteMenuItem;
