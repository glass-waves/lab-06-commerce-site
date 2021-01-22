import { modules } from '../products/modules.js';
import { getCart } from './cart-utils.js';
// import { cart } from './cart-data.js';
import { renderTableRows, renderTotalRow } from './render-table-row.js';
import { calcCartTotal } from './utils.js';

//CREATE CART TABLE ELEMENT AND ORDER BUTTON ELEMENT
const cartTable = document.getElementById('cart-table');
const orderButton = document.getElementById('order-button');

//RETRIEVE CURRENT CART AND STORE IN CART VARIABLE
const cart = getCart();

//ITERATE THROUGH CURRENT CART AND FOR EACH ITEM, RENDER A CORRESPONDING ROW AND APPEND TO TABLE
for (let item of cart) {
    const row = renderTableRows(item);
    cartTable.append(row);
}
//RENDER TOTAL ROW WITH CURRENT CART CONTENTS
const totalRow = renderTotalRow(cart);
//APPEND TOTAL ROW TO CART TABLE
cartTable.append(totalRow);


let totalNumberOfItems = 0; 

//DETERMINE HOW MANY ITEMS ARE IN CART
for (let item of cart) {
    totalNumberOfItems += item.quantity;
}
//DISABLE ORDER BUTTON IF CART IS EMPTY
if (cart.length === 0) {
    orderButton.disabled = true;
} else {
    //ADD EVENT LISTENER TO ORDER BUTTON
    orderButton.addEventListener('click', () =>{
        //CALCULATE CART TOTAL FROM STORED CART AND MODULE LIST
        const cartTotal = calcCartTotal(cart, modules);
        //ALERT USER OF CART CONTENTS AND TOTAL
        alert(`Thank you for your order of ${totalNumberOfItems} items. Your cart contains ${JSON.stringify(cart, true, 2)} total is $${cartTotal}.`);
        //REMOVE CART FROM LOCAL STORAGE
        localStorage.removeItem('CART');
        //REDIRECT USER TO HOME PAGE
        window.location = '../';
    });
}

