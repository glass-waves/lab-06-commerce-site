import { renderModules } from './render.js';
// import { modules } from './modules.js';
import { getProducts } from '../admin/admin-utils.js';

const productContainer = document.getElementById('product-container');
const products = getProducts();
console.log(products);
for (let product of products) {
    productContainer.append(renderModules(product));
}

console.log(localStorage.getItem('CART'));