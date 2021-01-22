import { modules } from '../products/modules.js';
import { getCart } from './cart-utils.js';
// import { cart } from './cart-data.js';
import { renderTableRows, renderTotalRow } from './render-table-row.js';
import { calcCartTotal } from './utils.js';

const cartTable = document.getElementById('cart-table');
const orderButton = document.getElementById('order-button');

const cart = getCart();

for (let item of cart) {
    const row = renderTableRows(item);
    cartTable.append(row);
}
const totalRow = renderTotalRow();
cartTable.append(totalRow);

let totalNumberOfItems = 0; 

for (let item of cart) {
    totalNumberOfItems += item.quantity;
}
if (cart.length === 0) {
    orderButton.disabled = true;
} else {
    orderButton.addEventListener('click', () =>{
        const cartTotal = calcCartTotal(cart, modules);
        localStorage.removeItem('CART');
        alert(`Thank you for your order of ${totalNumberOfItems} items. Your contains ${JSON.stringify(cart, true, 2)} total is $${cartTotal}.`);
        window.location = '../';
    });
}

