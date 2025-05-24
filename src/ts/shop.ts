type Offer = {
	number: number;
	percent: number;
};

interface Product {
	id: number;
	name: string;
	price: number;
	type: string;
	offer?: Offer;
}

interface CartItem extends Product {
	quantity: number;
}

// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
const products: Product[] = [
	{
		id: 1,
		name: 'cooking oil',
		price: 10.5,
		type: 'grocery',
		offer: {
			number: 3,
			percent: 20,
		},
	},
	{
		id: 2,
		name: 'Pasta',
		price: 6.25,
		type: 'grocery',
	},
	{
		id: 3,
		name: 'Instant cupcake mixture',
		price: 5,
		type: 'grocery',
		offer: {
			number: 10,
			percent: 30,
		},
	},
	{
		id: 4,
		name: 'All-in-one',
		price: 260,
		type: 'beauty',
	},
	{
		id: 5,
		name: 'Zero Make-up Kit',
		price: 20.5,
		type: 'beauty',
	},
	{
		id: 6,
		name: 'Lip Tints',
		price: 12.75,
		type: 'beauty',
	},
	{
		id: 7,
		name: 'Lawn Dress',
		price: 15,
		type: 'clothes',
	},
	{
		id: 8,
		name: 'Lawn-Chiffon Combo',
		price: 19.99,
		type: 'clothes',
	},
	{
		id: 9,
		name: 'Toddler Frock',
		price: 9.99,
		type: 'clothes',
	},
];

// => Reminder, it's extremely important that you debug your code.
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster.
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
const cart: CartItem[] = [];

const total: number = 0;

// Exercise 1
const buy = (id: number): void => {
	const product = products.find((p) => p.id === id);
	if (!product) {
		console.error(`Product with id ${id} not found.`);
		return;
	}

	const cartIndex = cart.findIndex((item) => item.id === id);
	if (cartIndex > -1) {
		cart[cartIndex].quantity++;
	} else {
		cart.push({ ...product, quantity: 1 });
	}

	console.log('🛒 Carret actual:');
	console.table(cart);

	// 1. Loop for to the array products to get the item to add to cart
	// 2. Add found product to the cart array
};

// Exercise 2
const cleanCart = () => {
	cart.length = 0;
	updateCartUI();

	console.log('🛒 Carret actual:');
	console.table(cart);
};

// Exercise 3
// Calculate total price of the cart using the "cartList" array
// const calculateTotal = () => {};

// Exercise 4
// Apply promotions to each item in the array "cart"
// const applyPromotionsCart = () => {};

// Exercise 5
// Fill the shopping cart modal manipulating the shopping cart dom
// const printCart = () => {};

// ** Nivell II **

// Exercise 7
// const removeFromCart = (id: number) => {};

// const open_modal = (): void => {
// 	printCart();
// };

const updateCartUI = (): void => {
	const countEl = document.getElementById('count_product');
	if (countEl) countEl.textContent = '0';

	const cartList = document.getElementById('cart_list');
	if (cartList) cartList.innerHTML = '';

	const totalPriceEl = document.getElementById('total_price');
	if (totalPriceEl) totalPriceEl.textContent = '0';
};

const emptyCartButtons = (): void => {
	const cleanCartButton = document.getElementById('clean-cart');
	if (cleanCartButton) {
		console.table(cart);
		cleanCartButton.addEventListener('click', cleanCart);
	}
};

const registerAddToCartButtons = (): void => {
	const addToCartButtons = document.querySelectorAll(
		'.add-to-cart'
	) as NodeListOf<HTMLButtonElement>;

	addToCartButtons.forEach((button) => {
		const pid = button.dataset.productId;
		if (!pid) return;
		const id = Number(pid);
		if (isNaN(id)) return;

		console.log(id, 'Button', pid);

		button.addEventListener('click', () => buy(id));
	});
};

document.addEventListener('DOMContentLoaded', registerAddToCartButtons);
document.addEventListener('DOMContentLoaded', emptyCartButtons);
