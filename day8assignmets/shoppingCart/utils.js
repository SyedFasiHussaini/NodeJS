const jwt=require("jsonwebtoken");

function validateToken(request, response, next){
    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader) {
        const token = authorizationHeader.split(" ")[1]; // Bearer <token>
        const secret=process.env.SECRET_KEY;
        const options={expiresIn:"2d", issuer:"http://localhost"};
        jwt.verify(token, secret, options, (err, result)=>{
            if (err){
                response.status(500).send({err:err});
            } else {
                // add the decoded value to request object.
                request.decoded = result;
                next();
            }
        })
    } else {
        response.status(201).send({msg:"Authorization error, Token required"});
    }
}
module.exports={validateToken};