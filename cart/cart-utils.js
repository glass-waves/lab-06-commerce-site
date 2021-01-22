import { findById } from './utils.js';

export const CART = 'CART';
const defaultEmptyCart = [];

export function getCart() {
    const stringyCart = localStorage.getItem(CART);

    if (stringyCart) {
        return JSON.parse(stringyCart);
    } else {
        localStorage.setItem('CART', JSON.stringify(defaultEmptyCart));
        return defaultEmptyCart;
    }
}

export function clearCart() {
    setCart(defaultEmptyCart);
}

export function setCart(cart) {
    const stringCart = JSON.stringify(cart);
    localStorage.setItem('CART', stringCart);
}

export function addToCart(id) {
    const cart = getCart();

    let cartItem = findById(id, cart);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        const newItem = {
            id: id,
            quantity: 1
        };
        cart.push(newItem);
    }
    setCart(cart);
}
