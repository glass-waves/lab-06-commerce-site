import { renderModules } from './render.js';
import { modules } from './modules.js';

const productContainer = document.getElementById('product-container');


for (let module of modules) {
    productContainer.append(renderModules(module));
}