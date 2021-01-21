export function findById(itemID, array) {
    for (let item of array) {
        if (item.id === itemID) return item;
    }
    return null;
}
export function calcSubTotal(cartItem, module) {
    const product = cartItem.quantity * module.price;
    return product.toFixed(2);
}

export function calcCartTotal(cart, productList){
    let total = 0;
    for (let item of cart) {
        const module = findById(item.id, productList);
        total += item.quantity * module.price;
    }
    return total;
}

