import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import App from './App';

import './index.css';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';
import Menu from './pages/Menu';
import EditMenuItem from './pages/UpdateMenuItem';
import Oreder from './pages/Order';
import OredersStatus from './pages/OrdersStatus';
import ShoppingCart from './pages/ShoppingCart';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import EditMenu from './pages/UpdateMenu';
import UpdateMenu from './pages/UpdateMenu';
import UpdateMenuItem from './pages/UpdateMenuItem';


const router = createBrowserRouter(
	createRoutesFromElements([
		<Route path='/' element={<App />}>
			<Route index element={<Home />} />
			<Route path='menu' element={<Menu />}>
			</Route>
			<Route path='signup' element={<SignUp />} />
			<Route path='signin' element={<SignIn />} />
			<Route path='orders' element={<OredersStatus />}>
				<Route path=':orderid' element={<Oreder />} />
			</Route>
			<Route path='cart' element={<ShoppingCart />} />
			<Route path='dashboard' element={<AdminDashboard />} />
				<Route path ='/dashboard/updatemenu' element={<UpdateMenu />} />
				<Route path='/dashboard/update-menu-item/:id' element={<UpdateMenuItem />} />
		</Route>,
	])
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
