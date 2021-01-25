import { addToCart, retrieveQuantity } from '../cart/cart-utils.js';



export function renderModules(module) {

    const box = document.createElement('div');
    box.classList.add('product-box');

    const moduleName = document.createElement('h2');
    moduleName.classList.add('title');
    moduleName.textContent = `${module.brand} ${module.moduleName}`;
    box.append(moduleName);
    
    const moduleImage = document.createElement('img');
    moduleImage.src = module.image;
    moduleImage.classList.add('module-image');
    box.append(moduleImage);

    const category = document.createElement('h3');
    category.classList.add('category');
    category.textContent = module.category;
    box.append(category);

    const size = document.createElement('h3');
    size.classList.add('hp');
    size.textContent = `${module.size} HP`;
    box.append(size);
    
    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = module.description;
    box.append(description);

    const price = document.createElement('h3');
    price.classList.add('price');
    price.textContent = `$${module.price}`;
    box.append(price);

    const addButton = document.createElement('button');
    addButton.setAttribute('value', module.id);
    addButton.textContent = 'Add to Cart';
    box.append(addButton);

    const quantityBox = document.createElement('p');
    quantityBox.classList.add('quantityBox');
    quantityBox.textContent = `Number in cart: ${retrieveQuantity(module)}`;
    box.append(quantityBox);

    addButton.addEventListener('click', () => {
        addToCart(module.id);
        quantityBox.textContent = `Number in cart: ${retrieveQuantity(module)}`;
    });

    

    return box;
}