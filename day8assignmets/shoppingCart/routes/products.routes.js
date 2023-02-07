var express=require("express");
var productsController=require("../controllers/productsController")
const morgan=require("morgan");//module to be installed
const path=require("path");
// logging of the requests -- morgan
const fs=require("fs");
const {validateToken} = require("../utils");
var router=express.Router();

// middleware specific to products route
router.use((request,response,next)=>{
    console.log("Products routes middleware",request.rootDirName);// path to he root folder
    var wStream=fs.createWriteStream(path.join(request.rootDirName,"log","serverLog.txt"),{flags:"a"});
    morgan("short",{stream:wStream})
    wStream.close();
    next();
})

//get request to /products
router.get("",(request,response,next)=>{
	var data = productsController.getProducts();
	if (data == []){
		response.status(204).send();
	} else if (data) {
		response.send(data);
	} else {
		response.status(404).send({msg:"No products found"});
	}
})

//post request to add products
router.post("",(request,response,next)=>{
    var productDetails = request.body;
    var result = productsController.addProducts(productDetails.productId, productDetails.productName, productDetails.price, productDetails.quantity, productDetails.category);
    if (result) {
        response.send({msg: "Products added to the catelog"});
    } else {
        response.status(201).send({msg: "Products not added"});
    }
})

router.put("/:pId",(request,response,next)=>{
    var productIdToBeUpdated = request.params.pId;
    var productData = request.body;
    var result = productsController.updateProduct(productIdToBeUpdated, productData);
    if (result) {
        response.send({msg:`Product Id ${productIdToBeUpdated} updated successfully`});
    } else {
        response.status(204).send({msg:`Product Id ${productIdToBeUpdated} not found to updated successfully`})
    }
})

router.delete("/:pId",validateToken,(request,response,next)=>{
    var productIdToBeDeleted = request.params.pId;
    var result = productsController.deleteProduct(productIdToBeDeleted);
    if (result) {
        response.send({msg:`Product Id ${productIdToBeDeleted} deleted successfully`});
    } else {
        response.status(204).send({msg:`Product Id ${productIdToBeDeleted} not found to deleted successfully`})
    }
})

module.exports=router;



