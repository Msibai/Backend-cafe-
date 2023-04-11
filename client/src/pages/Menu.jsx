import { useState, useEffect } from "react";
import "../style/edit-menu.css";
import { Link } from "react-router-dom";
import GlobalContext from '../context/GlobalContext.jsx';
import { useContext } from 'react';

function Menu() {
  const {menus} = useContext(GlobalContext);

 
  return (
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
            <button className="cart-button">-</button>
            <span className="cart-quantity">0</span>
            <button className="cart-button">+</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
