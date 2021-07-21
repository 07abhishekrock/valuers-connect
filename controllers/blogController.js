// const { query } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("../models/blogModel");
const multer = require("multer");
const fs = require('fs');
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
			if(file.fieldname === "blogFeatureImage"){
				const ext = file.mimetype.split('/')[1];
				cb(null, `blog-featureImage-${Date.now()}.${ext}`) 
			}
			else if(file.fieldname === "blogThumbnailImage"){
				const ext = file.mimetype.split('/')[1];
				cb(null, `blog-ThumbnailImage-${Date.now()}.${ext}`) 
			}
        }
    })
});

exports.uploadFeatureImage = upload.fields([{
	name:'blogFeatureImage'
},
{
	name:'blogThumbnailImage'
}
])
;

exports.getAllBlog = async (req, res, next) => {
	try {
		// 1) Filtering
		const queryObj = { ...req.query };
		const excludedFields = ["page", "sort", "limit", "fields"];
		excludedFields.forEach((el) => delete queryObj[el]);

		let query = Blog.find(queryObj).sort({createdAt : -1});
		console.log(req.query);
		console.log(queryObj);

		// 2) Limiting Fields
		if (req.query.fields) {
			const fields = req.query.fields.split(",").join(" ");
			query = query.select(fields);
		} else {
			query = query.select("-__v");
			console.log("Error");
		}

		// 3) Pagination
		const page = req.query.page * 1 || 1;
		const limit = req.query.limit * 1 || 20;
		const skip = (page - 1) * limit;

		query = query.skip(skip).limit(limit);

		if (req.query.page) {
			const numBlog = await Blog.countDocuments();
			if (skip >= numBlog) {
				throw new Error("This Page Does Not Exist");
			}
		}

		//Execute Query
		const blog = await query;

		//Send Response
		res.status(200).json({
			status: "success",
			result: blog.length,
			data: blog,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.addBlog = async (req, res, next) => {
	let filename = null;
	let files = JSON.parse(JSON.stringify(req.files));
	console.log(files);
    if(files.blogFeatureImage[0].location === undefined || files.blogThumbnailImage[0].location === undefined){
		res.status(400).json({
			status: "failure",
			message:"Either Banner image or Thumbnail image is not present!"
		});
    }
	else{
		filename = `${files.blogThumbnailImage[0].location},${files.blogFeatureImage[0].location}`;
	}

	try {
		const blog = await Blog.create({
			title: req.body.title,
			content: req.body.content,
			category: req.body.category,
			blogFeatureImage:filename
		});
		res.status(201).json({
			status: "success",
			data: {
				blog,
			},
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			status: "failure",
			message:error.message
		});
	}
};

exports.getOneBlog = async (req, res, next) => {
	try {
		const blog = await Blog.findById(req.params.id);
		res.status(200).json({
			status: "success",
			blog,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.updateBlog = async (req, res, next) => {
	let filename = null;
	let files = JSON.parse(JSON.stringify(req.files));
	console.log(files);
    if(files.blogFeatureImage[0].location === undefined || files.blogThumbnailImage[0].location === undefined){
		res.status(400).json({
			status: "failure",
			message:"Either Banner image or Thumbnail image is not present!"
		});
    }
	else{
		filename = `${files.blogThumbnailImage[0].location},${files.blogFeatureImage[0].location}`;
	}

	try {
		const blog = await Blog.findByIdAndUpdate(req.params.id, {
			title: req.body.title,
			content: req.body.content,
			blogFeatureImage:filename
		}, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				blog,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

exports.dBlog = async (req, res, next) => {
	try {
	const blog = await Blog.findByIdAndDelete(req.params.id);
		res.redirect('/admin/blogList')
	} catch (error) {
		console.log(error);
	}
};
