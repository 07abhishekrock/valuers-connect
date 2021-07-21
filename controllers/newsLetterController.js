const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const { NewsLetter } = require("../models/newsLetterModel");
const User = require("../models/userModel");
const Email = require("./../utils/email");
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
    contentType: function (req, file, cb) {
      cb(null, "application/pdf");
    },
    key: function (req, file, cb) {
      const ext = file.mimetype.split("/")[1];
      console.log("ext", ext);
      if (ext === "pdf") {
        cb(null, `newsletter-${Date.now()}.${ext}`); //use Date.now() for unique file keys
      } else {
        return cb(new Error("Only pdfs are allowed"));
      }
    },
  }),
});

exports.uploadImage = upload.single("newsletterdoc");

exports.getAllNewsLetter = async (req, res, next) => {
  const newsLetters = await NewsLetter.find();
  console.log("newsletters", newsLetters);
  res.status(200).json({
    status: "success",
    newsLetters,
  });
};

exports.addNewsLetter = async (req, res, next) => {
  console.log("add newsletter", req.body);
  let filename = null;
  if (req.file) {
    filename = req.file.location;
  }

  try {
    const newsLetter = await NewsLetter.create({
      description: req.body.description,
      filelink: filename,
    });
    console.log(newsLetter);
    res.status(201).json({
      status: "success",
      data: {
        newsLetter,
      },
    });

    let emails = [];
    let data = await User.find();
    data.map((value, index) => {
      let data = {};
      data.firstName = value.firstName;
      data.email = value.email;
      emails.push(data);
    });
    emails.map(async (value, index) => {
      let email = new Email(value, "");
      try {
        value.description = newsLetter.description;
        await email.send("newsletter", value);
      } catch (err) {
        console.log(err.message);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failure",
    });
  }
};

exports.getOneNewsLetter = async (req, res, next) => {
  try {
    const newsLetter = await NewsLetter.findById(req.params.id);
    res.status(200).json({
      status: "success",
      newsLetter,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateNewsLetter = async (req, res, next) => {
  let filename = null;
  if (req.file) {
    filename = req.file.location;
  }

  try {
    const newsLetter = await NewsLetter.findByIdAndUpdate(
      req.params.id,
      {
        description: req.body.description,
        filelink: filename,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        newsLetter,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteNewsLetter = async (req, res, next) => {
  try {
    const newsLetter = await NewsLetter.findByIdAndDelete(req.params.id);
    res.redirect("/admin/listNewsletter");
  } catch (error) {
    console.log(error);
  }
};
