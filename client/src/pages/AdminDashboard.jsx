import "./css/adminDashboard.css";
import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-dash-container">
      <h1>Admin Dashboard</h1>
      <div className="button-container">
        <Link to="/dashboard/addmenu" className="admin-link-buttons">
          Add Menu
        </Link>
        <Link to="/dashboard/updatemenu" className="admin-link-buttons">
          Update Menu
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
