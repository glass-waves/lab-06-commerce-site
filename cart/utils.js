export function findById(itemID, array) {
    for (let item of array) {
        if (item.id === itemID) return item;
    }
    return null;
}

