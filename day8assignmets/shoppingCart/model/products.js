class Products {
    productId;
    productName;
    price;
    quantity;
    category;

    constructor(productId,productName,price,quantity,category){
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
        this.category = category;
    }
}
module.exports = Products;