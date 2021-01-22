import { findById } from './utils.js';
// import { cart } from './cart-data.js';
import { modules } from '../products/modules.js';
import { calcSubTotal } from './utils.js';
import { removeFromCart } from './cart-utils.js';

export function renderTableRows(cartItem){
    const productRow = document.createElement('tr');
    const productImageTd = document.createElement('td');
    const productImage = document.createElement('img');
    const productTd = document.createElement('td');
    const quantityTd = document.createElement('td');
    const priceTd = document.createElement('td');
    const removeTd = document.createElement('td');
    const removeButton = document.createElement('button');
    const rowItem = findById(cartItem.id, modules);

    productImage.src = `../assets/${rowItem.image}`;
    productImageTd.appendChild(productImage);

    productTd.textContent = `${rowItem.brand} ${rowItem.moduleName}`;
    quantityTd.textContent = cartItem.quantity;
    priceTd.textContent = `$${calcSubTotal(cartItem, rowItem)}`;

    removeButton.textContent = 'Remove Item';
    removeTd.append(removeButton);
    removeButton.addEventListener('click', () => {
        cartItem.quantity--;
        priceTd.textContent = `$${calcSubTotal(cartItem, rowItem)}`;
        if (cartItem.quantity >= 1) {
            quantityTd.textContent = cartItem.quantity;
        }
        if (cartItem.quantity === 0){
            console.log('it equals zero');
            removeFromCart(cartItem.id);
            productRow.remove();
        }
        

    });

    productRow.append(productImageTd, productTd, quantityTd, priceTd, removeTd);

    return productRow;

}
export function renderTotalRow() {
    
}
