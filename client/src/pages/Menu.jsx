import { useState, useEffect } from "react";
import "../style/edit-menu.css";
import { Link } from "react-router-dom";
import GlobalContext from "../context/GlobalContext.jsx";
import { useContext } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import Gradient from "../images/gradient.jpg";

function Menu() {
  const { menus } = useContext(GlobalContext);
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();

  return (
    <div
      className="background-image"
      style={{ backgroundImage: `url(${Gradient})` }}
    >
      <div className="update-menu-title">
        <h1>Menu</h1>
        <div className="menu-container">
          {menus.map((menu) => (
            <div key={menu._id} className="menu-item">
              <img
                className="menu-item-img"
                src={menu.itemImg}
                alt={menu.itemName}
              ></img>
              <h2 className="menu-item-title">{menu.itemName}</h2>
              <p className="menu-item-description">{menu.description}</p>
              <p className="menu-item-price">{menu.pricePerItem} kr</p>
              <button onClick={() => decreaseCartQuantity(menu._id)}>-</button>
              <span className="cart-quantity">{getItemQuantity(menu._id)}</span>
              <button
                onClick={() => {
                  increaseCartQuantity(menu._id);
                }}
              >
                +
              </button>{" "}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
