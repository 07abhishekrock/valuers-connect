const express = require("express");
const blogController = require("./../controllers/blogController");

const router = express.Router();

router.route("/").get(blogController.getAllBlog).post(blogController.uploadFeatureImage,blogController.addBlog);

router.get('/del/blog/:id',blogController.dBlog)

router
	.route("/:id")
	.get(blogController.getOneBlog)
	.patch(blogController.uploadFeatureImage,blogController.updateBlog);
// .delete(blogController.deleteBlog);

module.exports = router;
