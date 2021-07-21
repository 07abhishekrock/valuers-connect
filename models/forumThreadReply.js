const mongoose = require("mongoose");
const validator = require("validator");

const forumThreadReplySchema = new mongoose.Schema(
	{
		threadReply: {
			type: String,
			required: true,
		},
		forumThread: {
			type: mongoose.Schema.ObjectId,
			ref: "ForumThread",
			required: [true, "A reply must belong to a thread"],
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [
				true,
				"A reply must belong to a User. either you are not loggedIn or there is Server Error",
			],
		},
		createdAt: {
			type: Date,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

forumThreadReplySchema.pre(/^find/, function (next) {
	this.populate({
		path: "user",
		select: "-__v -passwordChangedAt -degree -email -phoneNo",
	});
	next();
});

forumThreadReplySchema.pre(/^find/, function (next) {
	this.populate({
		path: "forumThread",
		select: "-user",
	});
	next();
});

const ForumThreadReply = mongoose.model(
	"ForumThreadReply",
	forumThreadReplySchema
);

module.exports = ForumThreadReply;
