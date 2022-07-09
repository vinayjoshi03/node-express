const mongoose = require("mongoose")
//const Any = new mongoose.Schema({ any: Schema.Types.Mixed });
const schema = mongoose.Schema({
	username: {type: String},
	password: String,
    role: Number,
    created: { type: Date, default: Date.now },
    token: String,
    tokenExpiryDate: { type: Date, default: Date.now },
    email: String
});

module.exports = mongoose.model("Users", schema)