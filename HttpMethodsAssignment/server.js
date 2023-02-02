var http = require("http");//core inbuilt module
var fs = require("fs");//core inbuilt module
var path = require("path");//core inbuilt module
var url=require("url");//core inbuilt module
var qs=require("querystring");//core inbuilt module
const port = 3000;
var postsArr=[];

var server = http.createServer((request,response)=>{
    // response.end("Response from server");

    var urlObject = url.parse(request.url);
    if(request.method=="GET" && urlObject.pathname=="/posts") {
        var qsObject = qs.parse(urlObject.query);
        for(item of Object.keys(qsObject))
        {
            console.log(`${item} : ${qsObject[item]}`);
        }
        var pos = postsArr.findIndex(item=>item.postName==qsObject.postName);
        if(pos>=0) {
            response.end(JSON.stringify(postsArr[pos]));
        } else {
            response.statusCode = 402;
            response.end("Data does not exists");
        }
        return;
    }

    if(request.url=="/posts") {

        if(request.method=="DELETE") {
            // Delete record
            var newPosts = "";
            request.on("data",(chunks)=>{
                newPosts += chunks;
            });
            request.on("end",()=>{
                var newPostsObj = JSON.parse(newPosts);
                var pos = postsArr.findIndex(item => item.postName == newPostsObj.postName);
                // pos = -1 if not found or pos = 0 or positive number if exists
                if(pos >= 0) {
                    postsArr.pop(newPostsObj);
                    response.end(JSON.stringify({msg:"Posts deleted"}));
                    
                } else {
                    response.statusCode=401;
                    response.end(JSON.stringify({err:"Posts does not exists to delete"}));
                }
                
            });
            request.on("errors",()=>{
                response.statusCode=401;
                response.end(JSON.stringify({err:"Deletion failed"}));
            });
            return;
        }
        if(request.method=="PATCH") {
            // Update an existing record
            // Data as a part of body
            var postsToBeUpdated="";
            request.on("data",(chunks)=>{
                postsToBeUpdated+=chunks;
            });
            request.on("end",()=>{
                var postsToBeUpdatedObj = JSON.parse(postsToBeUpdated);
                var pos=postsArr.findIndex(item => item.postName == postsToBeUpdatedObj.postName);
                if(pos>=0) {
                    postsArr[pos].status=postsToBeUpdatedObj.status;
                    response.end(JSON.stringify({msg:"Data updated successsfully",updateData:postsArr[pos]}));
                } else {
                    response.statusCode=401;
                    response.end(JSON.stringify({err:"Posts does not exists to be updated"}));
                }
            });
            request.on("errors",(err)=>{
                response.statusCode=500;
                response.end(JSON.stringify({err:err}));
            });
            return;
        }

        if(request.method=="GET") {
            // Select Query
            response.end(JSON.stringify(postsArr));
            return;
        }
        if(request.method=="POST") {
            // Insert Query
            // Data is coming in the body section of the request
            var newPosts = "";
            request.on("data",(chunks)=>{
                newPosts += chunks;
            });
            request.on("end",()=>{
                var newPostsObj = JSON.parse(newPosts);
                var pos = postsArr.findIndex(item => item.postName == newPostsObj.postName);
                // pos = -1 if not found or post = 0 or positive number if exists
                if(pos == -1) {
                    postsArr.push(newPostsObj);
                    response.end(JSON.stringify({msg:"New Posts created"}));
                    
                } else {
                    response.statusCode=401;
                    response.end(JSON.stringify({err:"Posts already exists with the given name"}));
                }
                
            });
            request.on("errors",()=>{
                // Insertion has failed
                console.log("Error in post request to /posts",err);
                response.statusCode=401;
                response.end(JSON.stringify({err:"Insertion failed"}));
            });
            return;
        }
    }
    response.end("Response from the server for undeveloped paths");
    
})
server.listen(port,()=>{
    console.log(`Server has started at port ${port}`);
})