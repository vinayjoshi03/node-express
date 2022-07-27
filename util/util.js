const crypto = require('node:crypto');
var { logger } = require('../loggerConfig');
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
    
    const jwtToken = jwt.sign(data, process.env.JWT_PRIVATE_KEY, {
        expiresIn: "2 days",
        algorithm: "HS256"
      });
    return jwtToken;
}

const verifyJwtToken = (token) => {
    try {
        const jwtToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        return jwtToken;
    } catch(error) {
        logger.error({ message: 'Invalid token', method: "verifyJwtToken" });
        return false;
    }
}
const formatDate = (date, addDay = false) => {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth() + 1).toString();
    var dd = date.getDate().toString();
    var mmChars = mm.split('');
    var ddChars = dd.split('');
    return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
}
const verifyToken = (req, res, next) => {
    const header = req.header['authorization'];
    if(typeof header !== 'undefined') {
        
    } else {
        return 
    }
}

module.exports = {
    hashPassword,
    isPasswordCorrect,
    generateBarerToken,
    formatDate,
    verifyJwtToken
};