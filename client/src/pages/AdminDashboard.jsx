import { Outlet } from "react-router-dom";
function AdminDashboard() {
	return (
		<>
			<div>
				<button className="add-menu-button"> Add item </button> 

				<button className="update-menu-button"> Update item </button>

				<Outlet> </Outlet>


			</div>
		</>
	);
}

export default AdminDashboard;
