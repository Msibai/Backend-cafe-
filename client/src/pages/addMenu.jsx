import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../style/edit-menu.css";
import FileBase64 from "react-file-base64";

function AddMenu() {
  const [menuItem, setMenuItem] = useState();
  const [itemName, setItemTitle] = useState();
  const [itemDescription, setItemDescription] = useState();
  const [itemImg, setItemImg] = useState();
  const [itemPricePerItem, setItemPrice] = useState();

  const [err, setErr] = useState("");
  const navigate = useNavigate();

  function goBack2() {
    navigate("/dashboard/");
  }
  const addItem = async (event) => {
    event.preventDefault();
    try {
      const changes = await fetch("/api/menus", {
        method: "POST",
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
      <h1 className="edit-menu-item-title">Add a menu item</h1>
      {err != "" ? (
        <div className="error">
          {" "}
          <h2 className="update-menu-item-error">{err}</h2>
        </div>
      ) : (
        ""
      )}

      <form onSubmit={addItem} className="edit-menu-item-container">
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

        <button type="submit" className="submit-add-button">
          Add item
        </button>
      </form>
      <button className="back-button" onClick={goBack2}>
        Back
      </button>
    </div>
  );
}

export default AddMenu;

/*import React from "react";
import { useState, useRef } from "react";
import "./css/addMenu.css";
import FileBase64 from "react-file-base64";

function AddMenu() {
  const nameRef = useRef();
  const descpRef = useRef();
  const priceRef = useRef();
  const [err, setErr] = useState("");
  const [image, setImage] = useState("");

  const addItem = async (itemName, description, pricePerItem) => {
    try {
      const response = await fetch("/api/menus", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName, description, pricePerItem, image }),
      });
      const result = await response.json();
      console.log(result);

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
      <h1 className="add-menu-item-title"> Add a menu item </h1>
      {err != "" ? (
        <div className="error">
          {" "}
          <h2 className="update-menu-item-error">{err}</h2>
        </div>
      ) : (
        ""
      )}
      <form
        className="form-container"
        onSubmit={(event) => {
          event.preventDefault();
          addItem(
            nameRef.current.value,
            descpRef.current.value,
            priceRef.current.value
          );
        }}
      >
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input ref={nameRef} type="text" id="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Description:</label>
          <input ref={descpRef} type="text" id="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input ref={priceRef} type="text" id="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <FileBase64
            multiple={false}
            onDone={({ base64 }) => setImage(base64)}
          />
        </div>

        <button type="submit" className="submit-add-button">
          Submit
        </button>
      </form>
    </div>
  );
}
export default AddMenu;

*/
