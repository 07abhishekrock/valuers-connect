// const { query } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");

const Tender = require("../models/tenderModel");
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
      const ext = file.mimetype.split("/")[1];
      cb(null, `tender-${Date.now()}.${ext}`); //use Date.now() for unique file keys
    },
  }),
});
exports.uploadTenderDocuments = upload.single("documents");

// exports.SaveDocument = catchAsync(async (req, res, next) => {
//   if (!req.files.documents) return next();
//    console.log(req.files);
//   // 1) Cover image
// //   req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
// //   await sharp(req.files.imageCover[0].buffer)
// //     .resize(2000, 1333)
// //     .toFormat('jpeg')
// //     .jpeg({ quality: 90 })
// //     .toFile(`public/img/tours/${req.body.imageCover}`);

//   // 2) Images
//   req.body.documents = [];

//   await Promise.all(
//     req.files.documents.map(async (file, i) => {
// 	const ext = file.mimetype.split('/')[1];
//       const filename = `tender-${Date.now()}-${i + 1}.jpeg`;

//       await sharp(file.buffer)
// 	  .resize(2000, 1333)
//     .toFormat('jpeg')
//     .jpeg({ quality: 90 })
//         .toFile(`public/tenderDoc`);

//       req.body.documents.push(filename);
//     })
//   );

//   next();
// });

exports.getAllTender = async (req, res, next) => {
  try {
    // 1) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let query = Tender.find(queryObj).sort({createdAt : -1});
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
    const limit = req.query.limit * 1;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTender = await Tender.countDocuments();
      if (skip >= numTender) {
        throw new Error("This Page Does Not Exist");
      }
    }

    //Execute Query
    const tender = await query;

    //Send Response
    res.status(200).json({
      status: "success",
      result: tender.length,
      data: tender,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addTender = async (req, res, next) => {

  let lastTender = await Tender.find({}).sort({_id:-1}).limit(1);
  let lastNumber = null;
  if(lastTender !== null && lastTender!== undefined &&  lastTender.length > 0){
    lastNumber = lastTender[0].tenderId;
    lastNumber = parseInt(lastNumber.substring(lastNumber.length - 3)) + 1;
  }


  try {
    // console.log('tHIS IS BBBBOOOODDDDyyyy',req.body.file);
    // console.log('FFFFIIIILLLLEEE___DDDAAAttAA',req.file);
    let filename = null;
    if(req.file){
      filename = req.file.location;
    }
  
    const tender = await Tender.create({
      title: req.body.title,
      category: req.body.category,
      tenderId : `VC${new Date().getFullYear()}/TENDERS/${lastNumber ? lastNumber : "101"}`,
      emd: req.body.emd,
      openingDate: req.body.openingDate,
      lastDate: req.body.lastDate,
      organizationDetail: req.body.organizationDetail,
      tenderAuthority: req.body.tenderAuthority,
      brief: req.body.brief,
      documents: filename,
    });
    res.status(201).json({
      status: "success",
      data: {
        tender,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failure",
      message: error.message
    });
  }
};

exports.getOneTender = async (req, res, next) => {
  try {
    const tender = await Tender.findById(req.params.id);
    res.status(200).json({
      status: "success",
      tender,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateTender = async (req, res, next) => {
  try {
    const tender = await Tender.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tender,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTender = async (req, res, next) => {
  try {
    const tender = await Tender.findByIdAndDelete(req.params.id);
    res.redirect("/admin/tenderlist");
  } catch (error) {
    console.log(error);
  }
};
