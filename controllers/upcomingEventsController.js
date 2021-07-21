// const { query } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const Events = require("../models/upcomingEventsModel");
const multer=require('multer')
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
      if(file.fieldname === "EventFeatureImage"){
				const ext = file.mimetype.split('/')[1];
				cb(null, `upcomingevent-FeatureImage-${Date.now()}.${ext}`) 
			}
			else if(file.fieldname === "EventThumbnailImage"){
				const ext = file.mimetype.split('/')[1];
				cb(null, `upcomingevent-ThumbnailImage-${Date.now()}.${ext}`) 
			}
    },
  }),
});

exports.uploadNewsImage = upload.fields([{
  name: "EventThumbnailImage"
},
{name:"EventFeatureImage"}

]);

exports.getAllEvents = async (req, res, next) => {
  try {
    // 1) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let query = Events.find(queryObj).sort({fromDate : -1});
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
      const numEvents = await Events.countDocuments();
      if (skip >= numEvents) {
        throw new Error("This Page Does Not Exist");
      }
    }

    //Execute Query
    const events = await query;

    //Send Response
    res.status(200).json({
      status: "success",
      result: events.length,
      data: {
        events,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addEvent = async (req, res, next) => {


  try {
    let filename = null;
    let files = JSON.parse(JSON.stringify(req.files));
      if(files.EventFeatureImage[0].location === undefined || files.EventThumbnailImage[0].location === undefined){
      res.status(400).json({
        status: "failure",
        message:"Either Banner image or Thumbnail image is not present!"
      });
      }
    else{
      filename = `${files.EventThumbnailImage[0].location},${files.EventFeatureImage[0].location}`;
    }
    const events = await Events.create({
      title:req.body.title,
      content:req.body.content,
      toDate:req.body.toDate,
      fromDate:req.body.fromDate,
      featureImage:filename
    });
    res.status(201).json({
      status: "success",
      data: {
        events,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getOneEvent = async (req, res, next) => {
  try {
    const events = await Events.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        events,
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
}

exports.updateEvent = async (req, res, next) => {
  const filteredBody = filterObj(req.body, "title", "content","fromDate","toDate");
  let filename = null;
  let files = JSON.parse(JSON.stringify(req.files));
    if(files.EventFeatureImage[0].location === undefined || files.EventThumbnailImage[0].location === undefined){
    res.status(400).json({
      status: "failure",
      message:"Either Banner image or Thumbnail image is not present!"
    });
    }
  else{
    filename = `${files.EventThumbnailImage[0].location},${files.EventFeatureImage[0].location}`;
  }
  filteredBody.featureImage = filename;
  if(req.body.date) filteredBody.date=req.body.date
  try {
    const event = await Events.findByIdAndUpdate(req.params.id,filteredBody, {
      new: true,
      runValidators: true,
    });
    console.log(event);
    res.status(200).json({
      status: "success",
      data: {
        event,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const events = await Events.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: "null",
    });
  } catch (error) {
    console.log(error);
  }
};
