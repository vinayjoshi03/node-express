const mongoose = require("mongoose")

const schema = mongoose.Schema({
	name: String,
	description: String,
    type: Number,
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Categories", schema)