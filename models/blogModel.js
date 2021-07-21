const mongoose = require("mongoose");
const validator = require("validator");

const BlogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		// unique: true,
	},
	content: {
		type: {},
		require: true,
	},

	category: String,

	blogFeatureImage: {
		type: String,
	},
	createdAt: {
		type: Date,
		default:new Date()
	},
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
