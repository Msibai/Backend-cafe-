import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
	// useState for all variables
	const authFromSession = sessionStorage.getItem('auth') || false;
	const isadminFromSession = sessionStorage.getItem('isadmin') || false;
	const isworkerFromSession = sessionStorage.getItem('isworker') || false;
	const iscustomerFromSession = sessionStorage.getItem('iscustomer') || false;
	const userIdFromSession = sessionStorage.getItem('userId') || '';

	const [auth, setAuth] = useState(authFromSession);
	const [isworker, setIsworker] = useState(isworkerFromSession);
	const [isadmin, setIsadmin] = useState(isadminFromSession);
	const [iscustomer, setIscustomer] = useState(iscustomerFromSession);
	const [user, setUser] = useState();
	const [userId, setUserId] = useState(userIdFromSession);
	const [menus, setMenus] = useState([]);

	const navigate = useNavigate();

	const submitLogin = async (email, password) => {
		const response = await fetch('/api/login', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});
		const result = await response.json();
		if (result) {
			setAuth(true);
			setUser(result.user.name);
			setUserId(result.user._id);
			sessionStorage.setItem('User', user);
			sessionStorage.setItem('auth', auth);
			sessionStorage.setItem('userId', userId);
		}

		if (result.user.admin) {
			setIsadmin(true);
			sessionStorage.setItem('isadmin', isadmin);

			navigate('/dashboard');
		} else if (result.user.restaurantWorker) {
			setIsworker(true);
			sessionStorage.setItem('isworker', isworker);

			navigate('');
		} else if (!result.user.admin && !result.user.restaurantWorker) {
			setIscustomer(true);
			sessionStorage.setItem('iscustomer', iscustomer);
			navigate('/myaccount', { state: { id: result.user._id } });
		}
	};

	const logout = async () => {
		const response = await fetch('/api/login', {
			method: 'delete',
		});
		const result = await response.json();
		setAuth(false);
		sessionStorage.clear();
	};

	const fetchMenuItems = async () => {
		const response = await fetch('/api/menus');
		const data = await response.json();
		setMenus(data);
	};

	useEffect(() => {
		fetchMenuItems();
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				auth,
				submitLogin,
				logout,
				isadmin,
				isworker,
				iscustomer,
				user,
				menus,
				userId,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalContext;
