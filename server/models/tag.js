const mongoose = require('mongoose');


const tagSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	date: { type: Date, default: Date.now },
	posts: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Post' }],
	followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model("Tag", tagSchema)