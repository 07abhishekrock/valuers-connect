var express = require("express");
const Banner = require("../models/homepageModel");
const authController = require("./authController");
const multer=require('multer')
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
            cb(null, `banner-${Date.now()}.${ext}`) //use Date.now() for unique file keys
        }
    })
});

exports.changeBanner = upload.single('bannerImage')



exports.changeHomepageBanner = async(req, res, next) => {
  let filename = null;
  if(req.file){
    filename = req.file.location;
  }

 const banner= await Banner.findByIdAndUpdate('60928245608c5c1f60c51878',{
   bannerImage:filename
   },
   {
    new: true,
    runValidators: true,
  })
    res.status(200).json({
      status:"success",
      banner
    })
};


exports.getAllHomepageBanner = async(req, res, next) => {
  console.log(req.file);
 const banner= await Banner.find()
    res.status(200).json({
      status:"success",
      banner
    })
};



exports.deleteHomepageBanner = async(req, res, next) => {
  console.log(req.file);
 const banner= await Banner.findByIdAndDelete(req.params.id)
    res.redirect('/admin/banner-list')
};




exports.addHomepageBanner=async(req, res, next) => {
  let filename = null;
  if(req.file){
    filename = req.file.location;
  }

 const banner= await Banner.create({
   bannerImage:filename})
    res.status(200).json({
      status:"success",
      banner
    })
};
// exports.router.patch("/admin/updateBanner/:id",authController.protect,authController.restrictTo('admin'),upload.single("featureImage"), async(req,res,next)=>{
//     const banner= await Banner.findByIdAndUpdate(req.params.id,req.body,{
//     new: true,
//     runValidators: true,
//   })
//     res.send(banner)
// });
