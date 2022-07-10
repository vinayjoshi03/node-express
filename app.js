const express = require("express")
const mongoose = require("mongoose") // new
const routes = require("./routes") // new
var bodyParser = require('body-parser');
var morgan = require('morgan');
const winston = require('winston');
var { logger } = require('./loggerConfig');


// Connect to MongoDB database
const uri = "mongodb+srv://root:RzMKcssQ6z7ghisW@cluster0.zon0z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
	.connect(uri, { useNewUrlParser: true })
	.then(() => {
		const app = express();
		var jsonParser = bodyParser.json();
		app.use((err, req, res, next) => {
			const errorResponse = {
				message: 'Please contact to service administrator',
				data:{}
			}
			const errorLog = {
				message: 'Please contact to service administrator',
				data:{},
				statusMessage:res.statusMessage,
				originalUrl: req.originalUrl,
				method:req.method

			}
			logger.error(errorLog);
			res.status(500).send(errorResponse);
			
			
		});
		/*app.use((req,res,next) => {
			res.status(404).send({message:'Please contact to service administrator', data:{}});
			logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
		})*/
		// create application/x-www-form-urlencoded parser
		var urlencodedParser = bodyParser.urlencoded({ extended: false })
		app.use('/api', jsonParser, routes);
		//app.use(morgan('combined'))
		app.listen(5000, () => {
			console.log("Server started running at 5000")
		})
	}).catch((e) => {
		
		console.error(e);
	})