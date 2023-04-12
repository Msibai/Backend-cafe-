import { Outlet } from 'react-router-dom';
import Header from './pages/Header';
import {GlobalProvider} from "../src/context/GlobalContext.jsx";
import Footer from './pages/Footer';


function App() {
	console.log(sessionStorage);
	return (
		<GlobalProvider>
		<div className='App'>
			
		<Header/>
			<Outlet />
		<Footer />	
		</div>
		</GlobalProvider>
	);

}

export default App;
