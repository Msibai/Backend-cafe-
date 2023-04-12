import { useShoppingCart } from '../context/ShoppingCartContext';
// import '../css/cartItem.css';
// import { formatCurrency } from '../utilities/formatCurrency.js';
import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext.jsx';

const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
	currency: 'SEK',
	style: 'currency',
});

export function formatCurrency(number) {
	return CURRENCY_FORMATTER.format(number);
}

export function CartItem({ id, quantity }) {
	const { menus } = useContext(GlobalContext);
	const {
		removeFromCart,
		increaseCartQuantity,
		decreaseCartQuantity,
		getItemQuantity,
	} = useShoppingCart();
	const item = menus.find((i) => i._id === id);
	// if (item == null) return null;
	return (
		<>
			<td className='cart-item'>
				<span className='info'>
					<p>{item.itemName}</p>
				</span>
			</td>
			<td>{formatCurrency(item.pricePerItem, 0)}</td>
			<td>
				<button onClick={() => decreaseCartQuantity(id)}>-</button>
				<span>{getItemQuantity(id)}</span>
				<button
					onClick={() => {
						increaseCartQuantity(id);
					}}>
					+
				</button>
			</td>
			<td>
				{formatCurrency(item.pricePerItem * quantity, 0)}
				<button onClick={() => removeFromCart(id)}>&times;</button>
			</td>
		</>
	);
}
