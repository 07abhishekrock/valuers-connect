const express = require("express");
const projectController = require("./../controllers/projectController");

const router = express.Router();

router.route("/").get(projectController.getAllProject).post(projectController.uploadProjectDoc,projectController.addNewProject);
router.get('/delete/:id',projectController.deleteProject)
router
  .route("/:id")
  .get(projectController.getOneProject)
  .patch(projectController.uploadProjectDoc,projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
