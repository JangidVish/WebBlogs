require('dotenv').config();
const jwt = require('jsonwebtoken');

function createTokenForUser(user){
    const payload={
        _id:user._id,
        email:user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role
    }
    const token = jwt.sign(payload, process.env.secret);
    return token;

}

function validateToken(token){
    const payload = jwt.verify(token, process.env.secret);
    return payload;
}

module.exports ={
    createTokenForUser,
    validateToken
}