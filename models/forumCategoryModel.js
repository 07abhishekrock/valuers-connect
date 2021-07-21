const mongoose = require("mongoose");

const forumCategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: [true, "This Heading/Category Already Exist"],
	},

	totalThreads : {
		type: Number,
		default : 0
	},

	forumThread: {
		type: String,
	},
	createdAt: {
		type: Date,
		default:new Date()
	},
});

const ForumCategory = mongoose.model("ForumCategory", forumCategorySchema);

module.exports = ForumCategory;
