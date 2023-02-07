var express=require("express");
var path=require("path");
var userController=require("../controllers/usersController")
var jwtToken=require("jsonwebtoken");
var router=express.Router();



// post request to /users/login
router.post("/login",(request,response)=>{
    var userDetails=request.body;
    var result=userController.checkUser(userDetails.userName,userDetails.password);
    if(result)
    {
        const payload={userName:userDetails.userName};
        const secret=process.env.SECRET_KEY;
        const options={expiresIn:"2d", issuer:"http://localhost"};
        jwtToken.sign(payload, secret, options, (err, token)=>{
            if (!err){
                response.status(200).send({msg:"User authenticated", token:token});
            } else {
                response.status(500).send({error:err});
            }
        })
    }
    else
    {
        response.status(403).send({msg:"Username and password do not match"})
    }
})

// post request to /users/register
router.post("/register",(request,response)=>{
    var userDetails=request.body;
    var result=userController.addUser(userDetails.userName,userDetails.password);
    if(result)
    {
        response.redirect("/users/login");
    }
    else
    {
        response.status(403).send({msg:"Could not register the user"});
    }

})

// get request to /users/login
router.get("/login",(request,response,next)=>{
    
    var filePath=path.join(request.rootDirName,"public","login.html")
    response.sendFile(filePath);

})

module.exports=router;
