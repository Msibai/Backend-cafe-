import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/edit-menu.css";
import FileBase64 from "react-file-base64";

function UpdateMenuItem() {
  const [menuItem, setMenuItem] = useState();
  const [itemName, setItemTitle] = useState();
  const [itemDescription, setItemDescription] = useState();
  const [itemImg, setItemImg] = useState();
  const [itemPricePerItem, setItemPrice] = useState();

  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const params = useParams();

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

  const submitChanges = async (event) => {
    event.preventDefault();
    try {
      const changes = await fetch(`/api/menus/${params.id}`, {
        method: "put",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(menuItem),
      });

      const result = await changes.json();
      console.log(changes);

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
      <h1 className="edit-menu-item-title">Update menu item</h1>
      {err != "" ? (
        <div className="error">
          {" "}
          <h2 className="update-menu-item-error">{err}</h2>
        </div>
      ) : (
        ""
      )}

      <form onSubmit={submitChanges} className="edit-menu-item-container">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder={menuItem?.itemName}
            value={itemName}
            onChange={(e) =>
              setMenuItem({ ...menuItem, itemName: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder={menuItem?.description}
            value={itemDescription}
            onChange={(e) =>
              setMenuItem({ ...menuItem, description: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            placeholder={menuItem?.pricePerItem}
            value={itemPricePerItem}
            onChange={(e) =>
              setMenuItem({ ...menuItem, pricePerItem: e.target.value })
            }
          />
        </div>
        <div className="form-group"></div>
        <label htmlFor="img">Image</label>
        <FileBase64
          multiple={false}
          onDone={({ base64 }) => setMenuItem({ ...menuItem, itemImg: base64 })}
        />

        <button type="submit" className="submit-edit-button">
          Update item
        </button>
      </form>
      <button className="back-button" onClick={goBack}>
        Back
      </button>
    </div>
  );
}

export default UpdateMenuItem;
