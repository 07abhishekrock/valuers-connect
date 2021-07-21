const mongoose = require("mongoose");
const validator = require("validator");

const forumThreadSchema = new mongoose.Schema(
	{
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
		document:{
			type:String,
		},
		// {
		// 	type: mongoose.Schema.ObjectId,
		// 	ref: "ForumCategory",
		// 	required: [true, "A Thread must belong to a Category."],
		// },
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [
				true,
				"A Thread must belong to a User. either you are not loggedIn or there is Server Error",
			],
		},
		photo:{
		type:String,
		},

		isApproved: {
			type: Boolean,
			default: false,
		},
		createdAt: {
			type: Date,
			default:new Date()
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

//Virtual Populate user
// forumThreadSchema.virtual("user", {
//   ref: "User",
//   foreignField: "user",
//   localField: "_id",
// });

forumThreadSchema.pre(/^find/, function (next) {
	this.populate({
		path: "user",
		select: "-__v -passwordChangedAt -degree -email -phoneNo",
	});
	next();
});

// forumThreadSchema.pre(/^find/, function (next) {
// 	this.populate({
// 		path: "category",
// 		// select: "-__v -passwordChangedAt ",
// 	});
// 	next();
// });

forumThreadSchema.virtual("reply", {
	ref: "ForumThreadReply",
	foreignField: "forumThread",
	localField: "_id",
});

const ForumThread = mongoose.model("ForumThread", forumThreadSchema);

module.exports = ForumThread;
