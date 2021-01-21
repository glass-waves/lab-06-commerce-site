import { modules } from '../products/modules.js';
import { cart } from './cart-data.js';
import { renderTableRows } from './render-table-row.js';
import { calcCartTotal, findById } from './utils.js';

const cartTable = document.getElementById('cart-table');
const totalRow = document.createElement('tr');
const empty1 = document.createElement('td');
const empty2 = document.createElement('td');
const empty3 = document.createElement('td');
const totalTd = document.createElement('td');

const orderButton = document.getElementById('order-button');


for (let item of cart) {
    const row = renderTableRows(item);
    cartTable.append(row);
}
let cartTotal = calcCartTotal(cart, modules);

totalTd.textContent = `Cart Total: $${cartTotal}`;
totalRow.append(empty1, empty2, empty3, totalTd);
cartTable.append(totalRow);

let totalNumberOfItems = 0; 

for (let item of cart) {
    totalNumberOfItems += item.quantity;
}

orderButton.addEventListener('click', () =>{
    alert(`Thank you for your order of ${totalNumberOfItems} items. Your total is $${cartTotal}.`)
});
