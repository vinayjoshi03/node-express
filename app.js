const express = require("express")
const mongoose = require("mongoose") // new
const routes = require("./routes") // new
var bodyParser = require('body-parser');
var morgan = require('morgan')
// Connect to MongoDB database
const uri = "mongodb+srv://root:RzMKcssQ6z7ghisW@cluster0.zon0z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
	.connect(uri, { useNewUrlParser: true })
	.then(() => {
		const app = express();
		var jsonParser = bodyParser.json()

		// create application/x-www-form-urlencoded parser
		var urlencodedParser = bodyParser.urlencoded({ extended: false })
		app.use('/api', jsonParser, routes);
		app.use(morgan('combined'))
		app.listen(5000, () => {
			console.log("Server started running at 5000")
		})
	}).catch((e) => {
		console.log(e);
	})