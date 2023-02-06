const express=require("express");//module to be installed
const path=require("path");
const bodyParser=require("body-parser");//module to be installed

const morgan=require("morgan");//module to be installed
// logging of the requests -- morgan


const fs=require("fs");

const port=3000;
var productArr = [{ productId: 101, productName: "LG Washing Machine", price: 1001, quantity: 1000},
{ productId: 102, productName: "Samsung LED", price: 2000, quantity: 1500 },
{ productId: 103, productName: "Refrigerator", price: 2000, quantity:  2000},
{ productId: 104, productName: "Microwave Oven", price: 3000, quantity: 2500 },
{ productId: 105, productName: "Laptop", price: 3500, quantity: 3000 },
{ productId: 106, productName: "Air conditioner", price: 4000, quantity: 3500 },
{ productId: 107, productName: "IPad", price: 3800, quantity: 4000 }]
var wStream=fs.createWriteStream(path.join(__dirname,"log","serverLog.txt"),{flags:"a"});


var app=express();
app.use(morgan("combined"));

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use((request,response,next)=>{
    console.log("Inside the first custom middleware");
    var now=new Date().toString();
    wStream.write(`Request Method : ${request.method}; Request url:${request.url}; Date: ${now}`);
    next();
})

app.use(express.static(path.join(__dirname,"public","files")));
app.use(express.static(path.join(__dirname,"public","images")));

app.use((request,response,next)=>{
    console.log("Inside the first custom middleware");
    if(request.method == "PUT")
    {
        response.send("PUT request received");

    }
    else
    {
        next();
    }
})
app.use((request,response,next)=>{
    console.log("New middleware");
    next();
})

app.use((request,response,next)=>{
    request.userName="asha";
    next();
})

app.use((request,response,next)=>{
    setTimeout(()=>{
        request.password="asha";
    },5000)
    next();
})
app.use((request,response,next)=>{
    console.log("Password",request.password);// asha or ud
  
    next();
})

app.post("/products",(request,response)=>{
  productArr.push(request.body);
  response.end("product Details added successfully")
})

app.get("/products",(request,response)=>{
    // return an productArr
    // implicitly set the content-type 
    // no stringify required for sending json data
    response.send(productArr);
})

app.get("/product",(request,response)=>{
    var pos=productArr.findIndex(item =>item.productName == request.userName);
    if(pos >=0)
    {
        var str1="product Details"+ JSON.stringify(productArr[pos]);
        response.send(str1);
    }
    else
    {
        response.sendStatus(404);
        response.send("product not found")
    }
    response.send(productArr);
})
app.get("/login",(request,response)=>{
    var filePath=path.join(__dirname,"public","login.html");
    response.sendFile(filePath);

})

app.get("/images",(request,response)=>{
    var filePath=path.join(__dirname,"public","flower.jpg");
    response.sendFile(filePath);
})

app.all("/",(request,response)=>{
    response.send("Response from the server");
})


console.log("Express example");
app.listen(port,()=>{
    console.log(`Server started at port : ${port}`);
})
