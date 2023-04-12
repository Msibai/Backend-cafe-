import { useShoppingCart } from '../context/ShoppingCartContext';
import { CartItem } from '../components/CartItem';
// import "../css/shoppingCart.css";
// import { formatCurrency } from "../utilities/formatCurrency.js";
import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext.jsx';
import Gradient from '../images/gradient.jpg';
import { Link, useNavigate } from 'react-router-dom';

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
	currency: 'SEK',
	style: 'currency',
});

export function formatCurrency(number) {
	return CURRENCY_FORMATTER.format(number);
}

export default function ShoppingCart({ isCartOpen }) {
	const { menus, userId } = useContext(GlobalContext);
	const { cartItems, cartQuantity, clearCart } = useShoppingCart();

	const navigate = useNavigate();
	console.log(userId);

	const createOrder = async () => {
		if (userId) {
			const response = await fetch('/api/orders', {
				method: 'post',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					items: cartItems.map((item) => item.id),
					restaurant: '64257a1e4c231de5bc6ac376',
					customer: userId,
				}),
			});
			const result = await response.json();
			if (response.ok) {
				clearCart();
				navigate('/order-confirmation');
			} else {
				navigate('/signin');
			}
		} else {
			navigate('/signin');
		}
	};

	return (
		<div
			className='background-image'
			style={{ backgroundImage: `url(${Gradient})` }}>
			<div className='shopping-cart'>
				{cartQuantity > 0 ? (
					<>
						<h2>
							Your Cart [{cartQuantity} Item{cartQuantity > 1 ? 's' : ''}]
						</h2>
						<div>
							<table>
								<thead>
									<tr>
										<th>Item</th>
										<th>Price</th>
										<th>Quantity</th>
										<th>Total</th>
									</tr>
								</thead>
								<tbody>
									{cartItems.map((item) => (
										<tr key={item.id}>
											<CartItem {...item} />
										</tr>
									))}
								</tbody>
								<tfoot>
									<tr>
										<td id='total' colSpan='3'>
											Total Amount
										</td>
										<td>
											{formatCurrency(
												cartItems.reduce((total, cartItem) => {
													const item = menus.find((i) => i._id === cartItem.id);
													return (
														total +
														(item?.pricePerItem || 0) * cartItem.quantity
													);
												}, 0)
											)}
										</td>
									</tr>
								</tfoot>
							</table>
						</div>
						<div>
							<button
								className='checkout-button'
								onClick={() => {
									createOrder();
								}}>
								Checkout
							</button>
						</div>
					</>
				) : (
					<>
						<h2>Your Cart is Empty</h2>
					</>
				)}
			</div>
		</div>
	);
}
