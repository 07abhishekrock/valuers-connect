const express = require("express");
const newsController = require("./../controllers/newsController");

const router = express.Router();

router.route("/").get(newsController.getAllNews).post(newsController.uploadNewsImage,newsController.addNews);
router.get('/delete/:id',newsController.deleteNews)
router.get('/sort',newsController.getSortedNewsByViews)
router.post('/news-feature',newsController.uploadNewsImage)

router
  .route("/:id")
  .get(newsController.getOneNews)
  .patch(newsController.uploadNewsImage,newsController.updateNews)
  .delete(newsController.deleteNews);

module.exports = router;
