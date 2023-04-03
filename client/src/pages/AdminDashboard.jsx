import './css/adminDashboard.css'
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="button-container">
        <Link to="/addmenu" className='admin-link-buttons'>Add Menu</Link>
        <Link to="/updatemenu" className='admin-link-buttons'>Update Menu</Link>
      </div>
    </div>
  );
};


export default AdminDashboard;


