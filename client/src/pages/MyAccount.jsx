import { Suspense, useEffect, useState } from 'react';
import '../style/myAccount.css';
import { useLocation } from 'react-router-dom';

function MyAccount() {
	const [profile, setProfile] = useState();
	const [orders, setOrders] = useState();
	const [update, setUpdate] = useState(false);
	const [updateProfile, setUpdateProfile] = useState();

	const location = useLocation();

	const fetchUserInfo = async () => {
		const response = await fetch(`/api/users/${location.state.id}`);
		const data = await response.json();
		setProfile({
			id: data._id,
			name: data.name,
			email: data.email,
			phoneNumber: data.phoneNumber,
		});
	};

	const fetchUserOrder = async () => {
		const response = await fetch(`/api/orders/${location.state.id}`);
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
		fetchUserInfo();
		fetchUserOrder();
	}, []);

	if (!profile || !orders) {
		return <h2>🌀 Loading...</h2>;
	} else {
		return (
			<>
				<h1>My Account</h1>
				<div className='profile'>
					<h2>{profile.name}</h2>
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
									setUpdateProfile({ ...updateProfile, email: e.target.value })
								}
							/>
						</div>
						<button type='submit'>Save</button>
					</form>
				)}

				<div className='orders'>
					<h2>My Orders</h2>
					{orders.map((order, i) => (
						<div className='group' key={i}>
							<p>
								<span>Order No.: </span>
								{order.orderNumber}
							</p>
							<p>
								<span>Items: </span>
								{order.items.map((item, i) => (i ? ' & ' : '') + item.itemName)}
							</p>
						</div>
					))}
				</div>
			</>
		);
	}
}
export default MyAccount;
