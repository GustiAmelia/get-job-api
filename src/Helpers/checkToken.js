const jwt = require("jsonwebtoken");

const formResponse = require("./formResponse");

const checkToken ={
    isValidToken: (req,res,next)=>{
        const bearerToken = req.header('x-access-token');
        if(!bearerToken){
            res.json({
                msg : 'Please Login First'
            });
        }
        try{
            const token = bearerToken.split(' ')[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.decodedToken = decoded;
            next()
        }
        catch (e) {
            formResponse.err(res, e);
          }
    },
}


module.exports=checkToken;