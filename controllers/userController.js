const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/userModel");
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
      cb(null, `user-profile-${req.user.id}-${Date.now()}.${ext}`); //use Date.now() for unique file keys
    },
  }),
});


exports.UpdateUserProfile = upload.single("userProfile")


//*************************Updating CurrentUser Data***********************************

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((element) => {
    if (allowedFields.includes(element)) newObj[element] = obj[element];
  });
  return newObj;
};


exports.updateUserContact = catchAsync(async (req, res, next) => {
  //1) Create Error if User Posted Passwod Data
  console.log('Body',req.body);

  if (req.body.password || req.body.passwordConf) {
    return next(
      new AppError(
        "This Route is not for Updating Password use /updatePassword for Updating Password",
        400
      )
    );
  }

  //2)Filtering the Data which we dont want to allow user to update
  const filteredBody = filterObj(req.body, "website", "linkedIn","address", "position","about","phoneNo");

  if(req.file) filteredBody.userProfile=req.file.filename;

  //Update Data
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody,
  {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      updateUser,
    },
  });
});






exports.updateUserDegree = catchAsync(async (req, res, next) => {
  //1) Create Error if User Posted Passwod Data
  console.log('Body',req.body);

  if (req.body.password || req.body.passwordConf) {
    return next(
      new AppError(
        "This Route is not for Updating Password use /updatePassword for Updating Password",
        400
      )
    );
  }

  //2)Filtering the Data which we dont want to allow user to update

  // const filteredBody = filterObj(req.body, "website", "linkedIn","whatsappNo", "position","about");
// if(req.file) filteredBody.userProfile=req.file.filename
  //Update Data
  const updateUser = await User.findById(req.user.id)
  console.log("USER BEFORE PUSHING DATA",updateUser);

  var degreeObj={
    degreeId:Math.floor(Math.random()*100000000000),
    degree:req.body.degreeName,
    fromDate:req.body.fromDate,
    toDate:req.body.toDate,
    college:req.body.college,
    university:req.body.university,
    spec:req.body.spec,


  }
  console.log("THIS IS SENDING AS DATA",req.body.form);
  console.log("THIS IS SENDING AS OBJECTDATA",degreeObj);


  updateUser.degree.push(degreeObj)
  console.log("USER AFTER PUSHING DATA",updateUser);

updateUser.save(function(err, updateUser) {
  if (err) return console.error(err);
  res.status(201).json({
    status: "success",
    data: {
      updateUser,
    },
  });
});

  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     updateUser,
  //   },
  // });
});


exports.updateUserPhoto = catchAsync(async (req, res, next) => {
  //1) Create Error if User Posted Passwod Data
  console.log('Body',req.body);
    console.log('Body',req.file);


    let filename = null;
    if(req.file){
      filename = req.file.location;
    }
  
// if(req.file) filteredBody.userProfile=req.file.filename
  //Update Data
  const updateUser = await User.findByIdAndUpdate(req.user.id, {userProfile:filename},
  {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      updateUser,
    },
  });
});




exports.updateUserExperience = catchAsync(async (req, res, next) => {
  //1) Create Error if User Posted Passwod Data
  console.log('Body',req.body);

  if (req.body.password || req.body.passwordConf) {
    return next(
      new AppError(
        "This Route is not for Updating Password use /updatePassword for Updating Password",
        400
      )
    );
  }

  //2)Filtering the Data which we dont want to allow user to update

  // const filteredBody = filterObj(req.body, "website", "linkedIn","whatsappNo", "position","about");
// if(req.file) filteredBody.userProfile=req.file.filename
  //Update Data
  const updateUser = await User.findById(req.user.id)
  console.log("USER BEFORE PUSHING DATA",updateUser);

  var experienceObj={
    experienceId:Math.floor(Math.random()*1000000000000),
    designation:req.body.designation,
    fromDate:req.body.fromDate,
    toDate:req.body.toDate,
    college:req.body.college,
    organization:req.body.organization,
  }
  console.log("THIS IS SENDING AS DATA",req.body.form);
  console.log("THIS IS SENDING AS OBJECTDATA",experienceObj);


  updateUser.experience.push(experienceObj)
  console.log("USER AFTER PUSHING DATA",updateUser);

updateUser.save(function(err, updateUser) {
  if (err) return console.error(err);
  res.status(201).json({
    status: "success",
    data: {
      updateUser,
    },
  });
});

  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     updateUser,
  //   },
  // });
});





exports.updateMe = catchAsync(async (req, res, next) => {
  //1) Create Error if User Posted Passwod Data
  console.log('FILLEEEE',req.file);
  console.log('Body',req.body);

  if (req.body.password || req.body.passwordConf) {
    return next(
      new AppError(
        "This Route is not for Updating Password use /updatePassword for Updating Password",
        400
      )
    );
  }

  //2)Filtering the Data which we dont want to allow user to update
  const filteredBody = filterObj(req.body, "degree", "experience","website", "linkedIn","whatsappNo", "position","about");
if(req.file) filteredBody.userProfile=req.file.location
  //Update Data
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody,
  //{
    // degree:req.body.degree,
    // experience:req.body.experience,
    // website:req.body.website,
    // linkedIn:req.body.linkedIn,
    // whatsappNo:req.body.whatsappNo,
    // position:req.body.position,
    // about:req.body.about,
    // userProfile:req.file.filename,
  //}, 
  {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      updateUser,
    },
  });
});

//*************************  END  ***********************************

exports.getAllUser = async (req, res, next) => {


const queryObj = { ...req.query };
	const excludedFields = ["page", "sort", "limit", "fields"];
	excludedFields.forEach((el) => delete queryObj[el]);
	let query = User.find(queryObj);
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
	const limit = req.query.limit * 1 
	const skip = (page - 1) * limit;

	query = query.skip(skip).limit(limit);
	let totalpage;
	let totalRecord;
	if (req.query.page) {
		const numUser = await User.countDocuments();
		totalRecord = numUser;
		totalpage = Math.ceil(numUser / limit);
		if (skip >= numUser) {
			throw new Error("This Page Does Not Exist");
		}
	}

	//Execute Query
	const user = await query;



  // const user = await User.find();
  res.status(200).json({
    status: "success",
    result: user.length,
    user,
    data: {
      user,
    },
  });
};

exports.addNewUser = (req, res, next) => {
  res.status(201).json({
    status: "Success",
    message: "Post Working",
  });
};

exports.getOneUser = (req, res, next) => {
  res.status(200).json({
    status: "Success",
  });
};

exports.updateUser = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: "<Updated User here>",
  });
};

exports.deleteManyUser = async(req, res, next) => {
  const delMultipleUser =await User.deleteMany({userRole:"user"},function (err) {
  if (err) return handleError(err);
  // deleted at most one tank document
})
  console.log("Entered Del Bock",delMultipleUser);
  res.status(204).json({
    status: "success",
    data: "null",
  });
};








exports.deleteUserExperience = catchAsync(async (req, res, next) => {
  const updateUser = await User.findById(req.user.id)
  console.log("USER BEFORE PUSHING DATA",updateUser);
  const i=req.params.index
  let expArr=updateUser.experience
  updateUser.experience.splice(i,1)

updateUser.save(function(err, updateUser) {
  if (err) return console.error(err);
 res.redirect('/my/profile');
})
});

exports.deleteUserDegree = catchAsync(async (req, res, next) => {
  const updateUser = await User.findById(req.user.id)
  console.log("USER BEFORE PUSHING DATA",updateUser);
  const i=req.params.index
  // let expArr=updateUser.experience
  updateUser.degree.splice(i,1)

updateUser.save(function(err, updateUser) {
  if (err) return console.error(err);
 res.redirect('/my/profile');
})
});