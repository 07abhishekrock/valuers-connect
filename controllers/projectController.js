// const { query } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const Project = require("../models/projectModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
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
      cb(null, `project-${Date.now()}.${ext}`); //use Date.now() for unique file keys
    },
  }),
});

exports.uploadProjectDoc = upload.single("projectDocuments");

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

exports.getAllProject = catchAsync(async (req, res, next) => {
  // 1) Filtering
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  let query = Project.find(queryObj);
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
  const limit = req.query.limit * 1 || 7;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
  let totalpage;
  let totalRecord;
  if (req.query.page) {
    const numProject = await Project.countDocuments();
    totalRecord = numProject;
    totalpage = Math.ceil(numProject / limit);
    if (skip >= numProject) {
      throw new Error("This Page Does Not Exist");
    }
  }

  //Execute Query
  const project = await query;

  //Send Response
  res.status(200).json({
    status: "success",
    totalpage,
    totalRecord,
    result: project.length,
    project,
    //  {
    //    project,
    // },
  });
});

exports.addNewProject = async (req, res, next) => {
  let filename = null;
  if(req.file){
    filename = req.file.location;
  }


  try {
    const newProject = await Project.create(
      {
        // document.querySelector(".createTenderAdmin").reset()
        category: req.body.category,
        institutionName: req.body.institutionName,
        assetLocation: req.body.assetLocation,
        assetCity: req.body.assetCity,
        applicationDeadline: req.body.applicationDeadline,
        auctionDate: req.body.auctionDate,
        reservePrice: req.body.reservePrice,
        propertyDetails: req.body.propertyDetails,
        projectDocuments: filename,
      }
      // req.body
    );
    res.status(201).json({
      status: "success",
      data: {
        newProject,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getOneProject = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id).populate("reply");
  if (!project) {
    return next(new AppError("No project found With This ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      project,
    },
  });
});

exports.updateProject = async (req, res, next) => {
  console.log("hello", req.file);
  console.log(req.body);
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        project,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const delProject = await Project.findByIdAndDelete(req.params.id);
    res.redirect("/admin/project");
  } catch (error) {
    console.log(error);
  }
};
