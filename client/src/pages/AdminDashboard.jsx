import {Outlet} from "react-router-dom";

function AdminDashboard() {
	return (

		<div>
		<button>Add</button>
		<button>Update</button>
		<Outlet></Outlet>

		</div>
	)
}

export default AdminDashboard;
