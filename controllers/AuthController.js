var UserModel = require('../models/Users');
var { logger } = require('../loggerConfig');
const { response } = require('express');
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
    const { generateBarerToken } = require('../util/util');
    const payload = {
        email: req.body.email,
        password: req.body.password
    }

    UserModel.findOne(payload, function (err, user) {
        if (err) {
            logger.error({ message: 'Please enter correct username & password', method: "doLogin", payload: req.body });
            res.status(200).send({ status: 200, message: 'Please enter correct username & password', data: { email: req.body.email } });
        }
        if (user === null) {
            logger.error({ message: 'Please enter correct username & password', method: "doLogin", payload: req.body });
            res.status(200).send({ status: 200, message: 'Please enter correct username & password', data: { email: req.body.email } });
        } else {
            const jwtData = {
                role: user.role,
                username: user.username,
                email: user.username,
            }
            const token = generateBarerToken(jwtData);
            logger.info({ message: 'User logged in successfully', method:  "doLogin", payload: {email: req.body.email}});

            res.status(200).send({ status: 200, message: 'User logged in successfully', data: { email: req.body.email, _token: token } });
        }
    });
    /*if (isExists.username !== undefined) {
        
        const jwtData = {
            role: isExists.role,
            username: isExists.username,
            email: isExists.username,
        }
        
        res.status(200).send({ status: 200, message: 'User logged in successfully', data: { email: req.body.email, _token:token } });
    } else {
        logger.error({ message: 'Please enter correct username & password', method:  "doLogin", payload: req.body});
        res.status(200).send({ status: 200, message: 'Please enter correct username & password', data: { email: req.body.email } });
    }*/

}

module.exports = {
    UserRegistration,
    findByEmail,
    doLogin
}