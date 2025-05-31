"use strict";
// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
const products = [
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
const cart = [];
let total = 0;
// Exercise 1
const buy = (id) => {
    const product = products.find((p) => p.id === id);
    if (!product) {
        console.error(`Product with id ${id} not found.`);
        return;
    }
    const cartIndex = cart.findIndex((item) => item.id === id);
    if (cartIndex > -1) {
        cart[cartIndex].quantity++;
    }
    else {
        cart.push(Object.assign(Object.assign({}, product), { quantity: 1 }));
    }
    calculateTotal();
    updateTotalUI();
    printCart();
};
// Exercise 2
const cleanCart = () => {
    cart.length = 0;
    resetCartUI();
};
// Exercise 3
// Calculate total price of the cart using the "cartList" array
const calculateTotal = () => {
    applyPromotionsCart();
    total = cart.reduce((sum, item) => {
        return (sum +
            (item.subtotalWithDiscount !== undefined
                ? item.subtotalWithDiscount
                : item.price * item.quantity));
    }, 0);
    return total;
};
// Exercise 4
// Apply promotions to each item in the array "cart"
const applyPromotionsCart = () => {
    for (const item of cart) {
        if (item.offer && item.quantity >= item.offer.number) {
            const discountFactor = 1 - item.offer.percent / 100;
            item.subtotalWithDiscount = +(item.price *
                discountFactor *
                item.quantity).toFixed(2);
        }
        else {
            delete item.subtotalWithDiscount;
        }
    }
};
// Exercise 5
// Fill the shopping cart modal manipulating the shopping cart dom
const printCart = () => {
    updateListUI();
};
// ** Nivell II **
// Exercise 7
const removeFromCart = (id) => {
    const index = cart.findIndex((item) => item.id === id);
    if (index === -1)
        return;
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }
    else {
        cart.splice(index, 1);
    }
    calculateTotal();
    updateTotalUI();
    printCart();
};
// const open_modal = (): void => {
// 	printCart();
// };
const updateListUI = () => {
    const countElements = document.getElementById('count_product');
    if (countElements) {
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        countElements.textContent = totalCount.toString();
    }
    const listElements = document.getElementById('cart_list');
    if (!listElements)
        return;
    listElements.innerHTML = '';
    cart.forEach((item) => {
        const price = item.price.toFixed(2);
        const qty = item.quantity;
        const lineTotal = (item.subtotalWithDiscount !== undefined
            ? item.subtotalWithDiscount
            : item.price * item.quantity).toFixed(2);
        const tr = document.createElement('tr');
        tr.innerHTML = `
			<th scope="row">${item.name}</th>
			<td>${price}€</td>
			<td><button class="btn btn-sm btn-outline-danger ms-2 remove-button" data-id="${item.id}" aria-label="Remove one ${item.name}">&minus;</button>${qty}</td>
			<td>${lineTotal}€</td>
		`;
        listElements.appendChild(tr);
    });
    removeFromCartButtons();
    console.log('🛒 Carret actual:');
    console.table(cart);
    console.log('🛒 Total:', total);
};
const updateTotalUI = () => {
    const totalPriceElements = document.getElementById('total_price');
    if (totalPriceElements) {
        totalPriceElements.textContent = total.toFixed(2);
    }
};
const resetCartUI = () => {
    const countElements = document.getElementById('count_product');
    if (countElements)
        countElements.textContent = '0';
    const cartList = document.getElementById('cart_list');
    if (cartList)
        cartList.innerHTML = '';
    const totalPriceElements = document.getElementById('total_price');
    if (totalPriceElements)
        totalPriceElements.textContent = '0';
    console.log('🛒 Carret actual:');
    console.table(cart);
    console.log('🛒 Total:', total);
};
const emptyCartButtons = () => {
    const cleanCartButton = document.getElementById('clean-cart');
    if (cleanCartButton instanceof HTMLButtonElement) {
        cleanCartButton.addEventListener('click', cleanCart);
    }
};
const registerAddToCartButtons = () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach((button) => {
        const pid = button.dataset.productId;
        if (!pid)
            return;
        const id = Number(pid);
        if (isNaN(id))
            return;
        console.log(id, 'Button', pid);
        button.addEventListener('click', () => buy(id));
    });
};
const removeFromCartButtons = () => {
    const removeItemButton = document.querySelectorAll('.remove-button');
    removeItemButton.forEach((button) => {
        const pid = button.dataset.id;
        if (!pid)
            return;
        button.addEventListener('click', () => removeFromCart(Number(pid)));
    });
};
document.addEventListener('DOMContentLoaded', () => {
    registerAddToCartButtons();
    emptyCartButtons();
});
