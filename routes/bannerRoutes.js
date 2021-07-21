const express = require("express");
const bannerController = require("../controllers/banner");

const router = express.Router();

// router.route("/").get(bannerController.getAllBlog).post(bannerController.uploadBlogImage,bannerController.addBlog);

router.get("/",(req,res,next)=>{
    res.status(200).json({
        status:"Success"
    })
});

router.get("/get-all-banner",bannerController.getAllHomepageBanner);

router.get("/delete/banner/:id",bannerController.deleteHomepageBanner);

router.patch("/changeBanner",bannerController.changeBanner,bannerController.changeHomepageBanner);
router.post("/changeBanner",bannerController.changeBanner,bannerController.addHomepageBanner);

// .get(bannerController.getOneBlog)
// .delete(bannerController.deleteBlog);

module.exports = router;
