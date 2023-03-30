import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import App from './App';
import Home from './Home';
import Menu from './Menu';
import MenuItem from './MenuItem';
import Oreder from './Order';
import OredersStatus from './OrdersStatus';
import ShoppingCart from './ShoppingCart';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './index.css';

const router = createBrowserRouter(
	createRoutesFromElements([
		<Route path='/' element={<App />}>
			<Route index element={<Home />} />
			<Route path='menu' element={<Menu />}>
				<Route path=':menuid' element={<MenuItem />} />
			</Route>
			<Route path='signup' element={<SignUp />} />
			<Route path='signin' element={<SignIn />} />
			<Route path='orders' element={<OredersStatus />}>
				<Route path=':orderid' element={<Oreder />} />
			</Route>
			<Route path='cart' element={<ShoppingCart />} />
			<Route path='dashboard' element={<AdminDashboard />} />
		</Route>,
	])
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
