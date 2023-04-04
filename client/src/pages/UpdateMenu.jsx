import { useState, useEffect } from "react";
import "../style/edit-menu.css"
import { Link } from "react-router-dom";

function UpdateMenu() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const response = await fetch("/api/menus");
      const data = await response.json();
      setMenus(data);
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="update-menu-title">
      <h1>Update Menu</h1>
      <div className="menu-container">
        {menus.map((menu) => (
          <div key={menu._id} className="menu-item">
            <h2 className="menu-item-title">{menu.itemName}</h2>
            <p className="menu-item-description">{menu.description}</p>
            <p className="menu-item-price">{menu.pricePerItem} kr</p>
            <Link
              to={`/dashboard/update-menu-item/${menu._id}`}
              state={{ data: menu._id }}
            >
              <button className="menu-item-button"> Update</button>
            </Link>
            <button className="delete-menu-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpdateMenu;

