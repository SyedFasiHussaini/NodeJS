const express=require("express");//module to be installed
const path=require("path");
const bodyParser=require("body-parser");//module to be installed
const morgan = require('morgan');

const fs=require("fs");
console.log("");
const port=3002;
var empArr = [{ empId: 101, empName: "Asha", salary: 1001, deptId: "D1" },
{ empId: 102, empName: "Gaurav", salary: 2000, deptId: "D1" },
{ empId: 103, empName: "Karan", salary: 2000, deptId: "D2" },
{ empId: 104, empName: "Kishan", salary: 3000, deptId: "D1" },
{ empId: 105, empName: "Keshav", salary: 3500, deptId: "D2" },
{ empId: 106, empName: "Pran", salary: 4000, deptId: "D3" },
{ empId: 107, empName: "Saurav", salary: 3800, deptId: "D3" }]
// var wStream=fs.createWriteStream(path.join(__dirname,"log","serverLog.txt"),{flags:"a"});


var app=express();
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, "log", 'serverLog.txt'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// app.use((request,response,next)=>{
//     console.log("Inside the first custom middleware");
//     var now=new Date().toString();
//     wStream.write(`Request Method : ${request.method}; Request url:${request.url}; Date: ${now}`);
//     next();
// })

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

app.post("/employees",(request,response)=>{
  console.log(request);
  response.end("Post request received")
})

app.get("/employees",(request,response)=>{
    // return an empArr
    // implicitly set the content-type 
    // no stringify required for sending json data
    response.send(empArr);
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
