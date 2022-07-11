const crypto = require('node:crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);
var jwt = require('jsonwebtoken');
const hashPassword = (password) => {
    var salt = crypto.randomBytes(128).toString('base64');
    var iterations = 10000;
    var hash = pbkdf2(password, process.env.PASSWORD_SECRET, iterations);

    return {
        salt: salt,
        hash: hash,
        iterations: iterations
    };
}

const isPasswordCorrect = (savedHash, savedIterations, passwordAttempt) => {
    
    return savedHash == pbkdf2(passwordAttempt, process.env.PASSWORD_SECRET, savedIterations);
}

const generateBarerToken = (data={}) => {
    
    const jwtToken = jwt.sign(data, process.env.JWT_PRIVATE_KEY);
    
    return jwtToken;
}

module.exports = {
    hashPassword,
    isPasswordCorrect,
    generateBarerToken
};