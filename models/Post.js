const mongoose = require("mongoose")

const schema = mongoose.Schema({
	title: String,
	content: String,
    type: Number,
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Post", schema)