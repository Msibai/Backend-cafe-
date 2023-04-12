import {Outlet, Navigate } from 'react-router-dom'
import GlobalContext from './context/GlobalContext.jsx';
import { useContext } from 'react';
const PrivateRoutes = () => {
	const { auth, isadmin } = useContext(GlobalContext);
	return(
		auth && isadmin ? <Outlet/> : <Navigate to= "/"/>
	)

}
export default PrivateRoutes