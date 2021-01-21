import { findById } from './utils.js';
// import { cart } from './cart-data.js';
import { modules } from '../products/modules.js';
import { calcSubTotal } from './utils.js';

export function renderTableRows(cartItem){
    const productRow = document.createElement('tr');
    const productImageTd = document.createElement('td');
    const productImage = document.createElement('img');
    const productTd = document.createElement('td');
    const quantityTd = document.createElement('td');
    const priceTd = document.createElement('td');
    
    const rowItem = findById(cartItem.id, modules);

    productImage.src = `../assets/${rowItem.image}`;
    productImageTd.appendChild(productImage);

    productTd.textContent = `${rowItem.brand} ${rowItem.moduleName}`;
    quantityTd.textContent = cartItem.quantity;
    priceTd.textContent = `$${calcSubTotal(cartItem, rowItem)}`;


    productRow.append(productImageTd, productTd, quantityTd, priceTd);

    return productRow;

}

