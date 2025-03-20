const jwt = require("jsonwebtoken");
const  User = require("../models/user");

const authMiddleware = async (req, res, next) =>{
    const token = req.header("Authorization");
    if(!token){
        return res.status(401)
        .json({msg: "Unauthorized http, token not provided"});
    }
    
    const jwtToken = token.replace("Bearer", "").trim();
    console.log("token form auth middleware", jwtToken);
    try {
        const isVerified = jwt.verify(jwtToken,  "EBOOKSTORE");
        const userData = await User.findOne({email: isVerified.email}).
        select({
            password: 0,
        });
        console.log(userData);
        req.user = userData;
        req.token= token;
        req.userID= userData._id;
       
        next();
    } catch (error) {
        return res.status(401).json({msg : "Unauthorized Invalid user"});
    }

    
} 

module.exports = authMiddleware;