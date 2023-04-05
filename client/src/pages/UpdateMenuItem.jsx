import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/edit-menu.css";

function UpdateMenuItem() {
  const [menuItem, setMenuItem] = useState();
  const [itemName, setItemTitle] = useState();
  const [itemDescription, setItemDescription] = useState();
  const [itemPricePerItem, setItemPrice] = useState();
  const params = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`/api/menus/${params.id}`);
      setMenuItem(await response.json());
      console.log(menuItem);
    };

    fetchItem();
  }, [params.id]);

  console.log(menuItem);

  const submitChanges = async (event) => {
    event.preventDefault();
    const changes = await fetch(`/api/menus/${params.id}`, {
      method: "put",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(menuItem),
    });
    console.log(changes);
  };
  return (
    <div className="page">
      <h1 className="edit-menu-item-title">Update menu item</h1>

      <form onSubmit={submitChanges} className="update-menu-item-container">
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

        <button type="submit" className="submit-edit-button">
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateMenuItem;
