const mongoose = require("mongoose");
const validator = require("validator");

const newsSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		// unique: true,
	},
	content: {
		type: {},
		// require: true,
	},

	category: String,

	featureImage: {
		type: String,
	},
	cardImage: {
		type: String,
	},
	createdAt: {
		type: Date,
		default : new Date()
	},
	isImportant: {
		type: Boolean,
		default:false
	},
	totalViews : {
		type: Number,
		default : 0
	}
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
