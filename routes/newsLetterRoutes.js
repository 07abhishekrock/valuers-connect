const express = require("express");
const newsLetterController = require("../controllers/newsLetterController");

const router = express.Router();

router
  .route("/")
  .get(newsLetterController.getAllNewsLetter)
  .post(newsLetterController.uploadImage, newsLetterController.addNewsLetter);

router.get("/del/:id", newsLetterController.deleteNewsLetter);

router
  .route("/:id")
  .get(newsLetterController.getOneNewsLetter)
  .patch(
    newsLetterController.uploadImage,
    newsLetterController.updateNewsLetter
  );
// .delete(newsLetterController.deleteBlog);

module.exports = router;
