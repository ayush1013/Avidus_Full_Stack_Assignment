require("dotenv").config();
const jwt = require("jsonwebtoken");


const AuthMiddleware = (req, res, next) => {

    const token = req.headers.authorization
    console.log( "Token is",token)
    console.log(req.body)
    if(token){
        const decode = jwt.verify(token, process.env.key);
        if(decode){
            console.log("decode",decode)
            const userID = decode.userID;
            req.body.userID = userID
            next();
        }else{
            res.send("Please Login")
        }
    }else{
        res.send("Please Login")
    }
}

module.exports = AuthMiddleware