var Products=require("../model/Products");

var prodArr = [
    new Products(1001, "Monitor", 20000, 10, "computer"),
    new Products(1001, "Monitor", 20000, 10, "computer"),
    new Products(1002, "Keyboard", 2000, 5, "computer"),
    new Products(1003, "Mouse", 500, 20, "computer"),
    new Products(1004, "CPU", 15000, 5, "computer"),
    new Products(1005, "Speakers", 3000, 25, "computer"),
    new Products(1006, "Charger", 1000, 30, "mobile"),
    new Products(1007, "Headset", 2000, 10, "mobile")
];


function getProducts(){
    return prodArr;
}

function addProducts(productId,productName,price,quantity,category){
    prodArr.push(new Products(productId,productName,price,quantity,category));
    return true;
}

function deleteProduct(productId) {
    var pos = prodArr.findIndex(item=> item.productId == productId);
    if (pos >= 0) {
        prodArr.splice(pos,1);
        return true;
    } else {
        return false;
    }
}

function updateProduct(productId, productData){
    var pos = prodArr.findIndex(item=> item.productId == productId);
    if (pos >= 0) {
        prodArr.splice(pos,1, productData);
        return true;
    } else {
        return false;
    }
}

module.exports={getProducts, addProducts, deleteProduct, updateProduct}