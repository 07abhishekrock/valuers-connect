const express = require("express");
const jobController = require("../controllers/jobController");

const router = express.Router();

router.get('/delete/:id',jobController.deleteJob)

router
	.route("/")
	.get(jobController.getAllJob)
	.post(jobController.addJob);

router
	.route("/:id")
	.get(jobController.getOneJob)
	.patch(jobController.updateJob)
	.delete(jobController.deleteJob);

module.exports = router;
