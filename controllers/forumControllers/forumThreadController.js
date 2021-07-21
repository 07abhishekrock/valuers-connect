// const { query } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const ForumThread = require("../../models/forumThreadModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const multer = require("multer");
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const BUCKET_NAME = 'valuers-connect-uploads';


AWS.config.update({
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	region: 'us-east-2'
});


let s3 = new AWS.S3();
const upload = multer({
	storage: multerS3({
        s3: s3,
		acl: 'public-read',
        bucket: BUCKET_NAME,
		key: function (req, file, cb) {
            const ext = file.mimetype.split('/')[1];
            cb(null, `forum-doc-${Date.now()}.${ext}`) //use Date.now() for unique file keys
        }
    })
});


exports.uploadForumDoc = upload.single("document")

// exports.resizeProductImage = (req, res, next) => {
//   if (!req.file) return next();
//   req.file.filename = `-product-Img${req.user._id}-${Date.now()}.jpeg`;

//   sharp(req.file.buffer)
//     .resize(600, 580)
//     .toFormat("jpeg")
//     .jpeg({
//       quality: 90
//     })
//     .toFile(`public/img/productImage/${req.file.filename}`);
//   next()
// };





exports.getAllForumThread = catchAsync(async (req, res, next) => {
	// 1) Filtering
	const queryObj = { ...req.query };
	const excludedFields = ["page", "sort", "limit", "fields"];
	excludedFields.forEach((el) => delete queryObj[el]);

	let query = ForumThread.find(queryObj).populate('reply');
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
		const numForumThread = await ForumThread.countDocuments();
		totalRecord = numForumThread;
		totalpage = Math.ceil(numForumThread / limit);
		if (skip >= numForumThread) {
			throw new Error("This Page Does Not Exist");
		}
	}

	//Execute Query
	const forumThreads = await query;

	//Send Response
	res.status(200).json({
		status: "success",
		totalpage,
		totalRecord,
		result: forumThreads.length,
		data: forumThreads,
		//  {
		//    forumThreads,
		// },
	});
});

exports.addNewForumThread = async (req, res, next) => {
	console.log(req.body)
	console.log(req.file);
	let file = null;
	try {
		if(req.file){
			file=req.file.location
		}
		if(req.body.isApproved){
			approved=true
		}
		else{
			approved=false
		}
		const newForumThread = await ForumThread.create({
			 title:req.body.title,
			category:req.body.category,
			content:req.body.content,
			user:req.body.user,
			document:file,
			isApproved:approved
			// document:req.file.filename,
			// document:req.body.bodyname,
			// document:req.body.bodyname,
			// document:req.body.filename,
			//   author: req.user.id,
		});
		res.status(201).json({
			status: "success",
			data: {
				newForumThread,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

exports.getOneForumThread = catchAsync(async (req, res, next) => {
	const forumThread = await ForumThread.findById(req.params.id).populate(
		"reply"
	);
	if (!forumThread) {
		return next(new AppError("No Tour ForumThread With This ID", 404));
	}

	res.status(200).json({
		status: "success",
		data: {
			forumThread,
		},
	});
});

exports.updateForumThread = async (req, res, next) => {
	console.log('hello',req.file)
	console.log(req.body);
	try {
		const forumThread = await ForumThread.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true }
		);
		res.status(200).json({
			status: "success",
			data: {
				forumThread,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

exports.deleteForumThread = async (req, res, next) => {
	try {
		const deleteForumThread = await ForumThread.findByIdAndDelete(
			req.params.id
		);
		res.status(204).json({
			status: "success",
			data: "null",
		});
	} catch (error) {
		console.log(error);
	}
};

exports.approveAdminForum = async (req, res, next) => {
	try {
		const deleteForumThread = await ForumThread.findByIdAndUpdate(
		req.params.id,
		{ isApproved: true },
		{
			new: true,
			runValidators: true,
		}
	);
		res.redirect('/admin/approveforum')
	} catch (error) {
		console.log(error);
	}
};

exports.denyAdminForum = async (req, res, next) => {
	try {
		const deleteForumThread = await ForumThread.findByIdAndDelete(
			req.params.id
		);
		res.redirect('/admin/approveforum')
	} catch (error) {
		console.log(error);
	}
};
