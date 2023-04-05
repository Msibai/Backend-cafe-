import "./css/adminDashboard.css";
import Loading from "../images/loading3.gif";
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-dash-container">
      <h1 className="admin-dash-title">Admin Dashboard</h1>
      <p className="admin-intro-text">Make changes to your menu</p>
      <img src={Loading} className="loading-gif"></img>
      <div className="button-container">
        <Link to="/dashboard/addmenu" className="admin-link-buttons">
          <button className="admin-buttons">Add a menu item</button>
        </Link>
        <Link to="/dashboard/updatemenu" className="admin-link-buttons">
          <button className="admin-buttons">Update a menu item</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
