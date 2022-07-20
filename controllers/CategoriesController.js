const CategoriesModel = require('../models/categories');
var UserModel = require('../models/Users');
var constants = require('../util/constants');
const mongoose = require("mongoose")
const addNewCategory = async (req, res) => {
    const payload = {
        name: req.body.name,
        userId: mongoose.Types.ObjectId(req.body.userId)
    }
    const Categories = new CategoriesModel(payload);
    const isExists = await CategoriesModel.findOne({ name: req.body.name }).exec();
    if (!isExists || isExists === null) {
        Categories.save(async (error, result) => {
            const userDetails = await UserModel.findByIdAndUpdate(
                mongoose.Types.ObjectId(payload.userId),
                {
                    $push: {
                        categories: result._id
                    }
                },
                { new: true, useFindAndModify: false }
            );
            res.status(constants.STATUS_200.STATUS).send({ status: constants.STATUS_200.STATUS, message: 'Category added successfully', data: {} });
        })

    } else {
        res.status(constants.STATUS_200.STATUS).send({ status: constants.STATUS_200.STATUS, message: 'Category name is already exists', data: {} });
    }
}

module.exports = {
    addNewCategory
}