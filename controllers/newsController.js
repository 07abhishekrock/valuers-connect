// const { query } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const News = require("../models/newsModel");
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const BUCKET_NAME = "valuers-connect-uploads";

AWS.config.update({
  secretAccessKey: process.env.AWS_ACCESS_SECRET,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: "us-east-2",
});

let s3 = new AWS.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: BUCKET_NAME,
    key: function (req, file, cb) {
      if(file.fieldname === "featureImage"){
				const ext = file.mimetype.split('/')[1];
				cb(null, `news-FeatureImage-${Date.now()}.${ext}`) 
			}
			else if(file.fieldname === "newsThumbnailImage"){
				const ext = file.mimetype.split('/')[1];
				cb(null, `news-ThumbnailImage-${Date.now()}.${ext}`) 
			}
    },
  }),
});

exports.uploadNewsImage = upload.fields([{
  name: "featureImage"
},
{name:"newsThumbnailImage"}

]);

exports.getSortedNewsByViews = async (req, res, next) => {
  try{
		const news_views = await News.find().sort({ totalViews : -1 }).limit(20);
    res.status(200).json({
      status: "success",
      result: news_views.length,
      data: news_views,
    });
  }
  catch(e){
    console.log(e);
  }
}

exports.getAllNews = async (req, res, next) => {
  try {
    // 1) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let query = News.find(queryObj).sort({createdAt : -1});
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
      const numNews = await News.countDocuments();
      if (skip >= numNews) {
        throw new Error("This Page Does Not Exist");
      }
    }

    //Execute Query
    const news = await query;

    //Send Response
    res.status(200).json({
      status: "success",
      result: news.length,
      data: news,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addNews = async (req, res, next) => {
  let filename = null;
	let files = JSON.parse(JSON.stringify(req.files));
	console.log(files);
    if(files.featureImage[0].location === undefined || files.newsThumbnailImage[0].location === undefined){
		res.status(400).json({
			status: "failure",
			message:"Either Banner image or Thumbnail image is not present!"
		});
    }
	else{
		filename = `${files.newsThumbnailImage[0].location},${files.featureImage[0].location}`;
	}


  try {
    const news = await News.create({
      title: req.body.title,
      content: req.body.content,
      featureImage: filename,
      isImportant:req.body.isImportant
    });
    res.status(201).json({
      status: "success",
      data: {
        news,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getOneNews = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        news,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((element) => {
    if (allowedFields.includes(element)) newObj[element] = obj[element];
  });
  return newObj;
};


exports.updateNews = async (req, res, next) => {
  const filteredBody = filterObj(req.body, "title", "content","totalViews","isImportant");
  let files = JSON.parse(JSON.stringify(req.files));
  let filename ;
    if(files.featureImage[0].location === undefined || files.newsThumbnailImage[0].location === undefined){
		res.status(400).json({
			status: "failure",
			message:"Either Banner image or Thumbnail image is not present!"
		});
    }
	else{
		filename = `${files.newsThumbnailImage[0].location},${files.featureImage[0].location}`;
	}
  filteredBody.featureImage = filename;
  try {
    const news = await News.findByIdAndUpdate(req.params.id, filteredBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        news,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteNews = async (req, res, next) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    res.redirect("/admin/newsList");
    // res.status(204).json({
    //   status: "success",
    //   data: "null",
    // });
  } catch (error) {
    console.log(error);
  }
};
