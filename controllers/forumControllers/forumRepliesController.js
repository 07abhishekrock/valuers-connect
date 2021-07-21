const express = require("express");
const ThreadReply = require("../../models/forumThreadReply");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
// exports.getAllForumReplies = (req, res, next) => {
// 	res.status(200).json({
// 		status: "success",
// 		result: 0,
// 		message: "It Worked",
// 	});
// };

exports.getAllForumReplies = catchAsync(async (req, res, next) => {
	// 1) Filtering
	const queryObj = { ...req.query };
	const excludedFields = ["page", "sort", "limit", "fields"];
	excludedFields.forEach((el) => delete queryObj[el]);

	let query = ThreadReply.find(queryObj);
	console.log(req.query);
	console.log(queryObj);

	// 2) Limiting Fields
	if (req.query.fields) {
		const fields = req.query.fields.split(",").join(" ");
		query = query.select(fields);
	} else {
		query = query.select("-__v");
	}

	// 3) Pagination
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 ;
	const skip = (page - 1) * limit;

	query = query.skip(skip).limit(limit);
	let totalpage;
	let totalRecord;
	if (req.query.page) {
		const numThreadReply = await ThreadReply.countDocuments();
		totalRecord = numThreadReply;
		totalpage = Math.ceil(numThreadReply / limit);
		if (skip >= numThreadReply) {
			throw new Error("This Page Does Not Exist");
		}
	}

	//Execute Query
	const threadReply = await query;

	//Send Response
	res.status(200).json({
		status: "success",
		totalpage,
		totalRecord,
		result: threadReply.length,
		data: threadReply,
		//  {
		//    forumThreads,
		// },
	});
});

exports.addNewForumReplies = async (req, res, next) => {
	try {
		const newForumReply = await ThreadReply.create(
			req.body
			//   author: req.user.id,
		);
		res.status(201).json({
			status: "success",
			data: {
				newForumReply,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

exports.getOneForumReplies = async(req, res, next) => {
	const reply= await ThreadReply.findOne(req.params._id)
	res.status(200).json({
		status: "success",
		data:reply
	});
};

exports.updateForumReplies = async(req, res, next) => {
	const reply= await ThreadReply.findByIdAndUpdate(req.query._id,{
		threadReply:req.body.form
	},
	{
		runValidators:true,
		new:true
	})
	res.status(200).json({
		status: "success",
		data: reply,
	});
};

exports.adminDeleteForumReplies = async(req, res, next) => {
	try {
		const deleteForumThread = await ThreadReply.findByIdAndDelete(req.params.id);
		res.redirect('/admin/threadlist')
	} catch (error) {
		console.log(error);
	}
	
};


exports.clientDeleteForumReplies = async(req, res, next) => {
	try {
		if(req.params.user != req.user.id){
			return next("You are not authorised to delete this reply")
		}
		var redirectId=req.params.redirectId

		const deleteForumThread = await ThreadReply.findByIdAndDelete(req.params.id);
		res.redirect(`/forum-thread/${redirectId}`)
		// res.status(204).json({
		// 	status:"success",
		// })
	} catch (error) {
		console.log(error);
	}
	
};

