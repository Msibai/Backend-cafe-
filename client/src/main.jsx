import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	BrowserRouter,
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
import MenuItem from './pages/MenuItem';
import Oreder from './pages/Order';
import OredersStatus from './pages/OrdersStatus';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'; 
import AddMenu from './pages/addMenu';

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
			<Route path='dashboard' element={<AdminDashboard />} />
			<Route path='/dashboard/addmenu' element={<AddMenu />} />

	
		</Route>,
	])
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
	<RouterProvider router={router} />	
	</React.StrictMode>
);
