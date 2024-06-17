const {validateToken} = require('../services/auth.service')

const User = require('../models/user')
function checkForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue) {
            return next(); 
        }

        try{       
             const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        }
        catch(error){
            console.error('Token validation error: ', error)
        }
        next();

    }
}



module.exports={
    checkForAuthenticationCookie
}