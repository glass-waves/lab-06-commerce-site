import { findById } from './utils.js';
// import { cart } from './cart-data.js';\
import { calcSubTotal, calcCartTotal } from './utils.js';
import { getCart, removeFromCart, setCart } from './cart-utils.js';
import { getProducts } from '../admin/admin-utils.js';


export function renderTableRows(cartItem){
    //CREATE PRODUCT ROW ELEMENT
    const productRow = document.createElement('tr');
    //CREATE EACH TD ELEMENT
    const productImageTd = document.createElement('td');
    const productImage = document.createElement('img');
    const productTd = document.createElement('td');
    const quantityTd = document.createElement('td');
    const priceTd = document.createElement('td');
    const removeTd = document.createElement('td');
    //CREATE REMOVE BUTTON ELEMENT
    const removeButton = document.createElement('button');

    //RETRIEVE CORRECT INFO FOR CURRENT CART ITEM FROM MODULES LIST AND STORE IN VARIABLE
    const modules = getProducts();
    const rowItem = findById(cartItem.id, modules);
    //SET IMAGE TO CORRECT IMAGE AND APPEND TO IMAGE TD
    productImage.src = rowItem.image;
    productImageTd.appendChild(productImage);
    //SET TEXT CONTENT OF NAME, QUANTITY AND PRICE TDs
    productTd.textContent = `${rowItem.brand} ${rowItem.moduleName}`;
    quantityTd.textContent = cartItem.quantity;
    priceTd.textContent = `$${calcSubTotal(cartItem, rowItem)}`;
    //SET TEXT CONTENT OF REMOVE BUTTON AND APPEND TO REMOVE BUTTON TD
    removeButton.textContent = 'Remove Item';
    removeTd.append(removeButton);
    //WHEN REMOVE BUTTON IS PUSHED
    removeButton.addEventListener('click', () => {
        //DECREMENT ITEM'S QUANTITY
        const cart = getCart();
        const newCartItem = findById(cartItem.id, cart);
        newCartItem.quantity--;

        //UPDATE SUB TOTAL AMOUNT ON CART PAGE
        priceTd.textContent = `$${calcSubTotal(newCartItem, rowItem)}`;
        //IF THERE IS STILL AT LEAST ONE IN THE CART, UPDATE QUANTITY ON CART
        if (newCartItem.quantity >= 1) {
            quantityTd.textContent = newCartItem.quantity;
            renderTotalRow(cart);
            setCart(cart);
            location.reload();
        }
        //IF THERE THE CART ITEM QUANTITY IS 0, CALL REMOVE FROM CART FUNCTION AND REMOVE PRODUCT ROW
        if (newCartItem.quantity === 0){
            removeFromCart(cartItem.id, cart);
            productRow.remove();
            console.log(cart);
            setCart(cart);
            location.reload();
        }
    });
    //APPEND ALL TDs TO PRODUCT ROW AND RETURN
    productRow.append(productImageTd, productTd, quantityTd, priceTd, removeTd);
    return productRow;
}


export function renderTotalRow(cartFromStorage) {
    //CREATE TOTAL ROW AND TOTAL ROW CELL ELEMENTS
    const totalRow = document.createElement('tr');
    const totalTd = document.createElement('td');
    const empty1 = document.createElement('td');
    const empty2 = document.createElement('td');
    const empty3 = document.createElement('td');

    //RUN calcTotalCart FUNCTION WITH CURRENT CART VALUES AND STORE IN CART TOTAL VARIABLE
    const cart = cartFromStorage;
    const modules = getProducts();
    let cartTotal = calcCartTotal(cart, modules);
    //SET TEXT CONTEND OF TOTAL CALL TO CART TOTAL
    totalTd.textContent = `Cart Total: $${cartTotal}`;
    //APPEND TOTAL CELL TO TOTAL ROW AND RETURN
    totalRow.append(empty1, empty2, empty3, totalTd);

    return totalRow;
}
