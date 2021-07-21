// const { query } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const Category = require("../models/forumCategoryModel.js");

exports.getAllCategory = async (req, res, next) => {
	try {
		// 1) Filtering
		const queryObj = { ...req.query };
		const excludedFields = ["page", "sort", "limit", "fields"];
		excludedFields.forEach((el) => delete queryObj[el]);

		let query = Category.find(queryObj);

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
			const numCategory = await Category.countDocuments();
			if (skip >= numCategory) {
				res.json({
					status:"failure",
					result:'no more pages found',
				})
				return;
				// throw new Error("This Page Does Not Exist");
			}
		}

		//Execute Query
		const category = await query;

		//Send Response
		res.status(200).json({
			status: "success",
			result: category.length,
			data: category,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.addCategory = async (req, res, next) => {
	try {
		const category = await Category.create(req.body);
		res.status(201).json({
			status: "success",
			data: {
				category,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

exports.getOneCategory = async (req, res, next) => {
	try {
		const category = await Category.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: {
				category,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

exports.updateCategory = async (req, res, next) => {
	try {
		const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({
			status: "success",
			data: {
				category,
			},
		});
	} catch (error) {
		console.log(error);
	}
};

exports.deleteCategory = async (req, res, next) => {
	try {
		const category = await Category.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: "success",
			data: "null",
		});
	} catch (error) {
		console.log(error);
	}
};
