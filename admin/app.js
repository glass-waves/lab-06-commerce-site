import { addToProducts} from './admin-utils.js';

const productForm = document.getElementById('product-entry-form');
console.log('loaded');
productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('I submitted the form!');

    const formData = new FormData(productForm);

    console.log(formData);
    const newProduct = {
        id: formData.get('product-id'),
        brand: formData.get('brand'),
        moduleName: formData.get('module-name'),
        image: formData.get('image'),
        category: formData.get('category'),
        size: formData.get('size'),
        description: formData.get('description'),
        price: formData.get('price')
    };

    addToProducts(newProduct);

});