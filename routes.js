const express = require("express")
const router = express.Router()
//const { hashPassword, decrypt } = require('./util/util');
const AuthController = require('./controllers/AuthController');
const Categories = require('./controllers/CategoriesController');
// Get all posts



router.post("/signup", (req, res) => {
	return AuthController.UserRegistration(req, res)
});
router.post("/login", (req, res) => {
	return AuthController.doLogin(req, res);
});
router.post("/add-category", AuthController.authUser, (req, res) => {
	return Categories.addNewCategory(req, res);
});
router.get('/logout',(req,res) => {
    req.session.destroy();
    res.status(200).send({"message":'User loggedout successfully'});
});


module.exports = router