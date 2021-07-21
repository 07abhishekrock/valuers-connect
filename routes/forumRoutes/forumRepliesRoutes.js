const express=require('express')
const forumController=require('../../controllers/forumControllers/forumRepliesController')
const authController = require("../../controllers/authController");

const router=express.Router()

router.route('/')
.get(forumController.getAllForumReplies)
.post(forumController.addNewForumReplies)

router.get('/admin/del/reply/:id',forumController.adminDeleteForumReplies)
router.get('/del/:redirectId/:user/:id',authController.protect,forumController.clientDeleteForumReplies)


router.route('/:id')
.get(forumController.getOneForumReplies)
// .delete(forumController.deleteForumReplies)
router.patch("/",forumController.updateForumReplies)
module.exports=router;