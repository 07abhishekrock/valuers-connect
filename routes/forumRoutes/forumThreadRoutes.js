const express = require("express");
const forumController = require("../../controllers/forumControllers/forumThreadController");
const authController = require("../../controllers//authController");

const router = express.Router();

router
  .route("/")
  .get(forumController.getAllForumThread)
  .post(authController.protect,forumController.uploadForumDoc,forumController.addNewForumThread);

router.get('/deny/:id',forumController.denyAdminForum)
router.get('/approve/:id',forumController.approveAdminForum)



router
  .route("/:id")
  .get(forumController.getOneForumThread)
  .patch(forumController.updateForumThread)
  .delete(forumController.deleteForumThread);

module.exports = router;
