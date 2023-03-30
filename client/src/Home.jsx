import { NavLink } from 'react-router-dom';

function Home() {
	return (
		<>
			{' '}
			<h1>Backend Cafe</h1>{' '}
			<NavLink
				to='signin'
				className={({ isActive }) => (isActive ? 'active' : '')}>
				Login
			</NavLink>
		</>
	);
}

export default Home;
