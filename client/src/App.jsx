import { Outlet } from 'react-router-dom';
import Header from './pages/Header';

import { GlobalProvider } from '../src/context/GlobalContext.jsx';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import Footer from './pages/Footer';

function App() {
	console.log(sessionStorage);
	return (
		

		
		<GlobalProvider>
		<ShoppingCartProvider>
				<Header />
				<Outlet />
				<Footer />	
			</ShoppingCartProvider>

		</GlobalProvider>
			
	);
}

export default App;
