import { useContext, useEffect, useState } from 'react';
import '../style/myAccount.css';
import { useLocation } from 'react-router-dom';
import Gradient from '../images/gradient.jpg';
import GlobalContext from '../context/GlobalContext';

function MyAccount() {
	const [profile, setProfile] = useState();
	const [orders, setOrders] = useState();
	const [update, setUpdate] = useState(false);
	const [updateProfile, setUpdateProfile] = useState();

	const { userId } = useContext(GlobalContext);

	const fetchUserInfo = async () => {
		const response = await fetch(`/api/users/${userId}`);
		const data = await response.json();
		setProfile({
			id: data._id,
			name: data.name,
			email: data.email,
			phoneNumber: data.phoneNumber,
		});
	};

	const fetchUserOrder = async () => {
		const response = await fetch(`/api/myorders/${userId}`);
		const data = await response.json();
		setOrders(data);
	};

	const submitUpdate = async (event) => {
		event.preventDefault();
		const changes = await fetch(`/api/users/${profile.id}`, {
			method: 'put',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(updateProfile),
		});

		setUpdate(false);
	};

	useEffect(() => {
		if (userId) {
			fetchUserInfo();
		    fetchUserOrder();
		}
	}, [userId]);

	if (!profile || !orders) {
		return <h2>🌀 Loading...Mongoose...Is...So...Slow</h2>;
	}
	return (
		<>
			<div
				className='background-image'
				style={{ backgroundImage: `url(${Gradient})` }}>
				<h1 className='my-account-title'>My Account</h1>
				<div className='profile'>
					<h2 className='customer'>{profile.name}</h2>
					<div className='group'>
						<p>
							<span>ID: </span>
							{profile.id}
						</p>
						<p>
							<span>Email: </span>
							{profile.email}
						</p>
						<p>
							<span>Phone No.: </span>
							{profile.phoneNumber}
						</p>
						<button onClick={() => setUpdate(true)}>Update</button>
					</div>
				</div>
				{update && (
					<form className='update-form' onSubmit={submitUpdate}>
						<div className='group'>
							<label htmlFor='name'>Name</label>
							<input
								type='text'
								id='name'
								defaultValue={profile.name}
								onChange={(e) =>
									setUpdateProfile({ ...updateProfile, name: e.target.value })
								}
							/>
						</div>
						<div className='group'>
							<label htmlFor='phoneNumber'>Phone Number</label>
							<input
								type='tel'
								id='phoneNumber'
								defaultValue={profile.phoneNumber}
								onChange={(e) =>
									setUpdateProfile({
										...updateProfile,
										phoneNumber: e.target.value,
									})
								}
							/>
						</div>
						<div className='group'>
							<label htmlFor='email'>Email</label>
							<input
								type='email'
								id='email'
								defaultValue={profile.email}
								onChange={(e) =>
									setUpdateProfile({
										...updateProfile,
										email: e.target.value,
									})
								}
							/>
						</div>
						<button type='submit'>Save</button>
					</form>
				)}

				<div className='orders'>
					<h2 className='customer'>My Orders</h2>
					{orders.map((order, i) => (
						<div className='group' key={i}>
							<p>
								<span>Order No.: </span>
								{order._id}
							</p>
							<p>
								<span>Items: </span>
								{order.items.map((item, i) => (i ? ' & ' : '') + item.itemName)}
							</p>
							<p>
								<span>Order status: </span>
								{  (order.status.Pending) &&
								 "Order Pending"}
								 {(order.status.Accepted) &&
								 "Order Accepted"	}
								 {(order.status.Declined) &&
								 "Order Declined"				
								}
								{(order.status.Ready) &&
								 "Order is Ready to be picked"				
								}
							</p>
							<p>
								<span>Order Pickup Time: </span>
								{ order.pickUpTime}
							</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
export default MyAccount;
