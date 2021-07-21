// const { query } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const Job = require("../models/jobModel");
const multer=require('multer')



exports.getAllJob = async (req, res, next) => {
  try {
    // 1) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let query = Job.find(queryObj);
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
      const numJob = await Job.countDocuments();
      if (skip >= numJob) {
        throw new Error("This Page Does Not Exist");
      }
    }

    //Execute Query
    const job = await query;

    //Send Response
    res.status(200).json({
      status: "success",
      result: job.length,
      data: job,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.addJob = async (req, res, next) => {
  try {
    console.log('bODDDyyyyyyyyyy',req.body);
    const job = await Job.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        job,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getOneJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        job,
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
exports.updateJob = async (req, res, next) => {
  // const filteredBody = filterObj(req.body, "position", "location", "form", "brief", "country", "requirements", "contact_details");
  try {

    const job = await Job.findByIdAndUpdate(req.params.id, {
      position:req.body.position,
      location:req.body.location,
      brief:req.body.brief,
      country:req.body.country,
      contact_details:req.body.contact_details,
      requirements:req.body.requirement,
      form:req.body.form
    }, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        job,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    res.redirect('/admin/job')
    // res.status(204).json({
    //   status: "success",
    //   data: "null",
    // });
  } catch (error) {
    console.log(error);
  }
};