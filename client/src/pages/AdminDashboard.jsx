import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="button-container">
        <Link to="/addMenu">Add Menu</Link>
        <Link to="/updateMenu">Update Menu</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;


