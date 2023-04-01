import React from 'react';


const AdminDashboard = () => {
	return (
		<div>
		  <h1>Admin Dashboard</h1>
		  <div className="button-container">
			<button onClick={() => { window.location.href = '/addMenu' }}>Add Menu</button>
			<button onClick={() => { window.location.href = '/updateMenu' }}>Update Menu</button>
		  </div>
		</div>
	  )
	
  };
  

export default AdminDashboard;
