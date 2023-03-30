import OrderRow from './components/OrderList.jsx'
import React, {useEffect, useState } from 'react'

function App() {
	//set state
	const [orders, setOrders] = useState([]);

	// first data grab
	useEffect(() => {
		fetch("http://localhost:3030/orders")
		.then(res => res.json())
		.then(data => setOrders(data)) // set data to state
	}, []);

	return(
		<div>
			<OrderRow orders={orders}/>
		</div>
	)
	
}

export default App;
