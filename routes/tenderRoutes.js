const express = require("express");
const tenderController = require("./../controllers/tenderController");

const router = express.Router();

router
  .route("/")
  .get(tenderController.getAllTender)
  .post(tenderController.uploadTenderDocuments,tenderController.addTender);

router.get('/delete/tender/:id',tenderController.deleteTender)

router
  .route("/:id")
  .get(tenderController.getOneTender)
  .patch(tenderController.uploadTenderDocuments,tenderController.updateTender)
  .delete(tenderController.deleteTender);

module.exports = router;
