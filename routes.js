const express = require("express")
const router = express.Router()
//const { hashPassword, decrypt } = require('./util/util');
const AuthController = require('./controllers/AuthController');
const Categories = require('./controllers/CategoriesController');
// Get all posts


router.post("/posts", async (req, res) => {
	return Categories.addNewCategory(rea, res);
});
router.post("/signup", (req, res) => {
	return AuthController.UserRegistration(req, res)
});


module.exports = router