const express = require("express")
const mongoose = require("mongoose") // new
const routes = require("./routes") // new
var bodyParser = require('body-parser');
var morgan = require('morgan');
const winston = require('winston');
var { logger } = require('./loggerConfig');
var session = require('express-session');

require('dotenv').config();
// Connect to MongoDB database
const uri = "mongodb+srv://root:RzMKcssQ6z7ghisW@cluster0.zon0z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
	.connect(uri, { useNewUrlParser: true })
	.then(() => {
		require('dotenv').config();
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
		const oneDay = 1000 * 60 * 60 * 24;
		app.use(session({resave: true, saveUninitialized: true, secret: 'XCR3rsasa%RDHHH', cookie: { maxAge: oneDay }}));
		/*app.use((req,res,next) => {
			res.status(404).send({message:'Please contact to service administrator', data:{}});
			logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
		})*/
		// create application/x-www-form-urlencoded parser
		var urlencodedParser = bodyParser.urlencoded({ extended: false })
		app.use('/api', jsonParser, routes);
		//app.use(morgan('combined'))
		app.listen(8080, () => {
			console.log("Server started running at 8080")
		})
	}).catch((e) => {
		
		console.error(e);
	})