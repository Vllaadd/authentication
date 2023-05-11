const jwt = require("jsonwebtoken");
const jwtSecret = 'd5f0dfc7595c92c8284f023d264780e97731e00f9feb0c9b59eb9a8adf8d8d0619586d';

exports.adminAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err){
                return res.statis(401).json({ message: "Not authorized"})
            }else{
                if(decodedToken.role !== "admin"){
                    return res.status(401).json({message: "Not authorized"})
                }else{
                    next()
                }
            }
        })
    }else{
        return res.status(401)
        .json({message: "Not authorized, token not available"})
    }
}