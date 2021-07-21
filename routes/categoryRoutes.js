const express = require("express");
const categoryController = require("./../controllers/categoryController");

const router = express.Router();

router
	.route("/")
	.get(categoryController.getAllCategory)
	.post(categoryController.addCategory);

router
	.route("/:id")
	.get(categoryController.getOneCategory)
	.patch(categoryController.updateCategory)
	.delete(categoryController.deleteCategory);

module.exports = router;
