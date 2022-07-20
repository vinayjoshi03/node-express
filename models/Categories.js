// module.exports = mongoose.model('Categories', categoriesSchema);
const mongoose = require("mongoose")
//const Any = new mongoose.Schema({ any: Schema.Types.Mixed });

const schema = mongoose.Schema({
    //_id: user_id,
    name: { type: String },
    description: { type: String },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
}, { collection: 'categories' });

module.exports = mongoose.model("categories", schema)