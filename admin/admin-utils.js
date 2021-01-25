const PRODUCTS = 'PRODUCTS';
import { modules } from '../products/modules.js';
const defaultProducts = modules;


export function getProducts() {
    const stringyProducts = localStorage.getItem(PRODUCTS);

    if (stringyProducts) {
        return JSON.parse(stringyProducts);
    } else {
        localStorage.setItem(PRODUCTS, JSON.stringify(defaultProducts));
        return defaultProducts;
    }
}

export function addToProducts(productObject) {
    const products = getProducts();

    products.push(productObject);

    localStorage.setItem(PRODUCTS, JSON.stringify(products));
}