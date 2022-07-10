const CategoriesModel = require('./../models/Categories');;
const addNewCategory = async (req, res) => {

    
    const isExists = await CategoriesModel.findOne({name:req.body.name}).exec();
    if (!isExists || isExists === null) {

    }
}

module.exports = {
    addNewCategory
}