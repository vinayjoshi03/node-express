var UserModel = require('../models/Users');
var { logger } = require('../loggerConfig');
const { response } = require('express');
let constants = require('../util/constants');
const UserRegistration = async function (req, res) {
    //const utility = require('../util/util');
    //console.log(utility.hashPassword(req.body.password));
    // console.log(req.body);
    // console.log(encrypt(req.body.password));

    const payload = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        role: 1,
        loginAttempt: 0,
        token: ''
    }
    const Users = new UserModel(payload);
    const isExists = await UserModel.findOne({ email: req.body.email }).exec();
    if (!isExists || isExists === null) {
        return await Users.save(function (error, result) {
            if (error) {
                logger.error({ message: 'Error occure while saving details into db', method: "UserRegistration" });
                res.status(500).senc({ data: {}, 'message': 'Error occure while saving details into db' })
            } else {
                logger.info({ status: 200, message: 'User Registered successfully', method: req.uri });
                res.status(200).send({ status: 200, message: 'User Registered successfully', data: { email: result.email } });
            }
        });
    } else {
        logger.error({ message: 'User is already exists', method: "UserRegistration", payload: req.body });
        res.status(200).send({ status: 200, message: 'User is already exists', data: { email: req.body.email } });
    }
}
const findByEmail = async (dataObject) => {
    const UserModel = require('../models/Users');
    return await UserModel.findOne(dataObject).exec();
}
const doLogin = async (req, res) => {
    const { generateBarerToken, formatDate } = require('../util/util');
    const payload = {
        email: req.body.email,
        password: req.body.password
    }
    UserModel.findOne(payload).populate('categories').exec(function (err, user) {
        if (err) {
            logger.error({ message: 'Please enter correct username & password', method: "doLogin", payload: req.body });
            res.status(200).send({ status: 200, message: 'Please enter correct username & password', data: { email: req.body.email } });
        }
        if (user === null) {
            logger.error({ message: 'Please enter correct username & password', method: "doLogin", payload: req.body });
            res.status(200).send({ status: 200, message: 'Please enter correct username & password', data: { email: req.body.email } });
        } else {
            console.log('user--->', user);
            const jwtData = {
                role: user.role,
                username: user.username,
                email: user.username,
            }
            const token = generateBarerToken(jwtData);
            const updateAuthToken = {
                token: token,
                tokenExpiryDate: formatDate(new Date(), true)
            }
            UserModel.findOneAndUpdate(
                {
                    email: req.body.email
                },
                updateAuthToken,
                {
                    returnNewDocument: true
                }
                , function (error, result) {
                    if (error) {
                        logger.error({ message: 'Please enter correct username & password', method: "doLogin", payload: req.body });
                        res.status(constants.STATUS_200.STATUS).send({ status: constants.STATUS_200.STATUS, message: 'Please enter correct username & password', data: { email: req.body.email } });
                    }
                });
            logger.info({ message: 'User logged in successfully', method: "doLogin", payload: { email: req.body.email } });
            res.status(200).send({ status: 200, message: 'User logged in successfully', data: { email: req.body.email, _token: token } });
        }
    });
}

const authUser = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    if (typeof authorizationHeader !== undefined && authorizationHeader.length > 0) {
        const authToken = authorizationHeader.split(' ')[1];
        const payload = {
            token: authToken,
        }
        UserModel.findOne(payload, function (err, user) {
            if (err) {
                logger.error({ message: 'Invalid authorization header', method: "authUser", payload: req.body });
                res.status(constants.STATUS_403.STATUS).send({ status: constants.STATUS_403.STATUS, message: constants.STATUS_403.MESSAGE, data: {} });
                next();
            }
            if (user === null) {
                logger.error({ message: 'Invalid authorization header', method: "authUser", payload: req.body });
                res.status(constants.STATUS_403.STATUS).send({ status: constants.STATUS_403.STATUS, message: constants.STATUS_403.MESSAGE, data: {} });
                next();
            }

            const tokenExpired = user.tokenExpiryDate;
            if (new Date(tokenExpired) <= new Date()) {
                return next();
            } else {
                logger.error({ message: 'Invalid authorization header', method: "authUser", payload: req.body });
                res.status(403).send({ status: 403, message: 'Invalid request', data: {} });
                next();
            }
        }
        )
    } else {
        logger.error({ message: 'Invalid authorization header', method: "authUser", payload: req.body });
        res.status(403).send({ status: 403, message: 'Invalid request', data: {} });
    }
}

module.exports = {
    UserRegistration,
    findByEmail,
    doLogin,
    authUser
}