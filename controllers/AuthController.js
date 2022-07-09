const UserRegistration = async function (req, res) {
    //const utility = require('../util/util');
    //console.log(utility.hashPassword(req.body.password));
    // console.log(req.body);
    // console.log(encrypt(req.body.password));
    const UserModel = require('../models/Users');
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
    const isExists = await UserModel.findOne({email:req.body.email}).exec();
    if (!isExists || isExists === null) {
        return await Users.save(function (error, result) {
            if (error) {
                res.status(500).senc({ data: {}, 'message': 'Error occure while saving details into db' })
            } else {
                res.status(200).send({ status: 200, message: 'User Registered successfully', data: { email: result.email } });
            }
        });
    } else {
        res.status(404).send({ status: 404, message: 'User is already exists', data: { email: req.body.email } });
    }
}
const findByEmail = async (dataObject) => {
    const UserModel = require('../models/Users');
    return await UserModel.findOne(dataObject).exec();
}

module.exports = {
    UserRegistration,
    findByEmail
}