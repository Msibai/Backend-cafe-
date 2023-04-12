import { createContext, useContext, useState } from 'react';
import '../style/shoppingCart.css';

const ShoppingCartContext = createContext({});

// const cartFromLoacalStorage = JSON.parse(localStorage.getItem('cart')) || [];

export function useShoppingCart() {
	return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }) {
	const [cartItems, setCartItems] = useState([]);
	const cartQuantity = cartItems.reduce(
		(quantity, item) => item.quantity + quantity,
		0
	);

	// useEffect(() => {
	// 	localStorage.setItem('cart', JSON.stringify(cartItems));
	// }, [cartItems]);

	function getItemQuantity(id) {
		return cartItems.find((item) => item.id === id)?.quantity || 0;
	}

	function increaseCartQuantity(id) {
		setCartItems((currItems) => {
			if (currItems.find((item) => item.id === id) == null) {
				return [...currItems, { id, quantity: 1 }];
			} else {
				return currItems.map((item) => {
					if (item.id === id) {
						return { ...item, quantity: item.quantity + 1 };
					} else {
						return item;
					}
				});
			}
		});
	}

	function decreaseCartQuantity(id) {
		let decreasedItem = cartItems.find((item) => item.id === id);
		setCartItems((currentItems) => {
			if (decreasedItem?.quantity === 1) {
				return currentItems.filter((item) => item !== decreasedItem);
			} else {
				return currentItems.map((item) => {
					if (item === decreasedItem) {
						return { ...item, quantity: item.quantity - 1 };
					} else {
						return item;
					}
				});
			}
		});
	}

	function removeFromCart(id) {
		let removedItem = cartItems.find((item) => item.id === id);
		setCartItems((currentItems) => {
			return currentItems.filter((item) => item !== removedItem);
		});
	}

	function clearCart() {
		setCartItems([]);
	}

	return (
		<ShoppingCartContext.Provider
			value={{
				getItemQuantity,
				increaseCartQuantity,
				decreaseCartQuantity,
				removeFromCart,
				cartItems,
				cartQuantity,
				clearCart,
			}}>
			{children}
		</ShoppingCartContext.Provider>
	);
}
