const mongoose = require("mongoose")
//const Any = new mongoose.Schema({ any: Schema.Types.Mixed });
const schema = mongoose.Schema({
   //_id: user_id,
	username: {type: String},
	password: String,
    firstname: String,
    lastname: String,
    gender: String,
    email: String,
    role: Number,
    loginAttempt: Number,
    lastLoggedinDate: { type: Date, default: Date.now },
    token: String,
    tokenExpiryDate: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    updated:{ type: Date, default: Date.now }
});

module.exports = mongoose.model("Users", schema)