import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GlobalContext = createContext(null);

export const GlobalProvider = ({ children }) => {
	const authFromSession = sessionStorage.getItem('auth') || false;
	const isadminFromSession = sessionStorage.getItem('isadmin') || false;
	const isworkerFromSession = sessionStorage.getItem('isworker') || false;
	const iscustomerFromSession = sessionStorage.getItem('iscustomer') || false;
	const userIdFromSession = sessionStorage.getItem('userId') || '';
	const userNameFromSession = sessionStorage.getItem('userName') || '';

	const [auth, setAuth] = useState(authFromSession);
	const [isworker, setIsworker] = useState(isworkerFromSession);
	const [isadmin, setIsadmin] = useState(isadminFromSession);
	const [iscustomer, setIscustomer] = useState(iscustomerFromSession);
	const [user, setUser] = useState(userNameFromSession);
	const [userId, setUserId] = useState(userIdFromSession);
	const [menus, setMenus] = useState([]);

	const navigate = useNavigate();

	const submitLogin = async (email, password) => {
		try {
			const response = await fetch('/api/login', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			});
			const result = await response.json();
			if (result.user) {
				setAuth(true);
				setUser(result.user.name);
				setUserId(result.user._id);
			}
			if (result.user.admin) {
				setIsadmin(true);

				navigate('/dashboard');
			} else if (result.user.restaurantWorker) {
				setIsworker(true);

				navigate('');
			} else if (!result.user.admin && !result.user.restaurantWorker) {
				setIscustomer(true);
				navigate('/myaccount');
			}
		} catch (error) {
			navigate("/");
		}
	};

	useEffect(() => {
		if (auth) {
			sessionStorage.setItem('userName', user);
			sessionStorage.setItem('auth', auth);
			sessionStorage.setItem('userId', userId);
			if (isadmin) {
				sessionStorage.setItem('isadmin', isadmin);
			} else if (isworker) {
				sessionStorage.setItem('isworker', isworker);
			} else {
				sessionStorage.setItem('iscustomer', iscustomer);
			}
		}
	}, [auth, isadmin, iscustomer, isworker, userId]);

	const logout = async () => {
		const response = await fetch('/api/login', {
			method: 'delete',
		});
		const result = await response.json();
		setAuth(false);
		setIsadmin(false);
		setIsworker(false);
		setIscustomer(false);
		setUserId('');
		setUser('');
		sessionStorage.clear();
		navigate('/');
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
