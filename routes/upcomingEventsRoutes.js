const express = require("express");
const upcomingEventsController = require("../controllers/upcomingEventsController");

const router = express.Router();

router
  .route("/")
  .get(upcomingEventsController.getAllEvents)
  .post(upcomingEventsController.uploadNewsImage,upcomingEventsController.addEvent);

router
  .route("/:id")
  .get(upcomingEventsController.getOneEvent)
  .patch(upcomingEventsController.uploadNewsImage,upcomingEventsController.updateEvent)
  .delete(upcomingEventsController.deleteEvent);

module.exports = router;
