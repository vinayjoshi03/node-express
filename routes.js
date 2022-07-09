const express = require("express")
const Post = require("./models/Post") // new
const Users = require("./models/Users") // new
const router = express.Router()
const { hashPassword, decrypt } = require('./util/util');

// Get all posts
router.get("/posts", async (req, res) => {
	console.log('post rout');
	const posts = await Post.find({ title: 'Post 5' })
	res.send(posts)
});

router.post("/posts", async (req, res) => {
	console.log(req.body);
	//let data = {...req.body, created:}
	const post = new Post(req.body)
	await post.save()
	res.send(JSON.stringify(req.body))
});

router.post("/signup", async (req, res) => {
	//const encrypt = './util/util';
	console.log(req.body);
	console.log(encrypt(req.body.password));
	const Users = new Post(req.body)
	await Users.save()
	res.send(JSON.stringify(req.body))
});


module.exports = router