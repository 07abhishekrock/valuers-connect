var express = require("express");
const viewController = require("./../controllers/viewController/clientFrontEnd");
const bannerController = require("../controllers/banner");

const authController = require("./../controllers/authController");

var router = express.Router();

// router.route("/news").get(viewController.getAllNews);

router.use(authController.isLoggedIn);
// ADMIN RELATED ROUTE
router.get("/admin/newslist",authController.protect,authController.restrictTo('admin'), viewController.getAllNewsAdmin);
router.get("/admin/createnews",authController.protect,authController.restrictTo('admin'), viewController.createNewsAdmin);
router.get("/admin/updatenews/:id", viewController.updateNewsAdmin);
// router.post("/news-data", viewController.createNewsAdminForm);
//added by abhishek Jha
router.get("/admin/updatejob/:id",viewController.updateJobAdmin);

router.get("/admin/userlist",authController.protect,authController.restrictTo('admin'), viewController.getAllUserAdmin);
router.get("/admin/updateuser/:id",authController.protect,authController.restrictTo('admin'), viewController.updateUserAdmin);
router.get("/admin/delete/user/:id",authController.protect,authController.restrictTo('admin'), viewController.deleteUserAdmin);

router.get("/admin/create-job",authController.protect,authController.restrictTo('admin'), viewController.createJobAdmin);
router.get("/admin/banner-list",authController.protect,authController.restrictTo('admin'), viewController.getAllBannerAdmin);


router.get("/admin/tenderlist",authController.protect,authController.restrictTo('admin'), viewController.getAlltenderAdmin);
router.get("/admin/createtender",authController.protect,authController.restrictTo('admin'), viewController.createTenderAdmin);
router.get("/admin/updatetender/:id",authController.protect,authController.restrictTo('admin'), viewController.updateTenderAdmin);


router.get("/admin/threadlist",authController.protect,authController.restrictTo('admin'), viewController.getAllThreadAdmin);
// router.get("/admin/Createcategory",authController.protect,authController.restrictTo('admin'), viewController.getCreateCategotyAdmin);




router.get("/admin/bloglist",authController.protect,authController.restrictTo('admin'), viewController.getAllBlogAdmin);
router.get("/admin/createblog",authController.protect,authController.restrictTo('admin'), viewController.getCreateBlogAdmin);
router.get("/admin/updateblog/:id",authController.protect,authController.restrictTo('admin'), viewController.getUpdateBlogAdmin);



router.get("/admin/createCategory",authController.protect,authController.restrictTo('admin'), viewController.createCategoryAdmin);
router.get("/admin/category",authController.protect,authController.restrictTo('admin'), viewController.getAllCategoryAdmin);
router.post("/admin/create-category",authController.protect,authController.restrictTo('admin'), viewController.formCategoryAdmin);
router.get("/admin/deletecategory/:id",authController.protect,authController.restrictTo('admin'), viewController.deleteCategoryAdmin);




router.get("/admin/createEvent",authController.protect,authController.restrictTo('admin'), viewController.createEventAdmin);
router.get("/admin/events",authController.protect,authController.restrictTo('admin'), viewController.getAllEventAdmin);
router.get("/admin/delete/events/:id",authController.protect,authController.restrictTo('admin'), viewController.deleteEventAdmin);


router.get("/admin/createjob",authController.protect,authController.restrictTo('admin'), viewController.createJobAdmin);
router.get("/admin/job",authController.protect,authController.restrictTo('admin'), viewController.getAllJobAdmin);


router.get("/admin/createproject",authController.protect,authController.restrictTo('admin'), viewController.createProjectAdmin);
router.get("/admin/project",authController.protect,authController.restrictTo('admin'), viewController.getAllProjectAdmin);
router.get("/admin/updateproject/:id",authController.protect,authController.restrictTo('admin'), viewController.getupdateProjectAdmin);



router.get("/admin/createNoti",authController.protect,authController.restrictTo('admin'), viewController.createNotificationAdmin);
router.get("/admin/notification",authController.protect,authController.restrictTo('admin'), viewController.getAllNotificationAdmin);
router.get("/admin/delete/notification/:id",authController.protect,authController.restrictTo('admin'), viewController.deleteNotificationAdmin);

router.post("/admin/notification",authController.protect,authController.restrictTo('admin'), viewController.postFormNotification);

//  postFormNotification

router.get("/admin/forumcreate",authController.protect,authController.restrictTo('admin'), viewController.getcreateForumAdmin);
router.get("/admin/approveforum",authController.protect,authController.restrictTo('admin'), viewController.forumApproveDenyAdmin);
router.get("/admin/forumdelete/:id",authController.protect,authController.restrictTo('admin'), viewController.deleteForumAdmin);

router.get("/admin/changeBanner",authController.protect,authController.restrictTo('admin'), viewController.getUpdateBanner);


router.get("/chat",authController.protect,(req, res) => {
  console.log('hello', req.query.target); 
  res.render("clientFrontEnd/chat_updated" , {
    target_chat_id : req.query.target || '' 
  })
})
//
//
//User Related Route
router.get("/login", viewController.login);
router.get("/signup", viewController.signup);
router.get("/forgot-password", viewController.forgotPassword);
router.get("/reset_password/:token", viewController.resetPassword);

// router.get("/", viewController.undermaintenance);

router.get("/", viewController.getHomePage);
router.get("/forum-thread", viewController.getForumThreadPage);

router.get("/forum-thread/:id", viewController.getDiscussionPage);

router.get("/tender", viewController.getAllTender);
router.get("/tender/:id",authController.protect, viewController.getOneTender);


router.get("/forum_categories",viewController.getAllForumCategories);

router.get("/news", viewController.getAllNews);
/////////testin with form data send news
router.get("/news/:id", viewController.getOneNews);

//added by Abhishek Jha
router.get("/events/:id",viewController.getOneEvent);
router.get("/events",viewController.getAllEvents);

router.get("/career", viewController.getAllJob);
router.get("/job-detail/:id", viewController.getjobDetail);

router.get("/blog", viewController.getAllBlog);
router.get("/blog/:id", viewController.getOneBlog);


router.get("/payment", viewController.getPaymentPage);


router.get("/project", viewController.getAllProject);
router.get("/project/:id",authController.protect, viewController.getOneProject);


router.get("/my/profile",authController.protect , viewController.getUserPrivateProfile);
router.get("/edit/profile/:id", authController.protect, viewController.getEditUserPrivateProfile);

router.get("/user/profile/:id",  viewController.getUserPublicProfile);

// router.get("/user/profile",  viewController.getUserPrivateProfile);

router.get("/event/:id",  viewController.getEventClient);
router.get("/event-update/:id",  viewController.getupdateEventAdmin);

router.get("/pricing", viewController.getPricing);

router.get("/newsletter",viewController.getNewsLetter);

router.get("/contact-us",viewController.getContactUsPage);


module.exports = router;
