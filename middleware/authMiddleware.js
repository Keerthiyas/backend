const jsonwebtoken = require('jsonwebtoken');
const User = require('../models/user');
exports.authMiddleware = async(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"No token provided"});
        }
        else{
            const decode = jsonwebtoken.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decode.id);
            req.role=decode.role;
            next();
        }
    } catch (err) {
        return res.status(401).json({message:"Invalid token"});
    }
}