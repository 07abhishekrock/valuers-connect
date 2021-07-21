const mongoose = require("mongoose");
const validator = require("validator");

const eventsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    // unique: true,
  },
  content: {
    type: {},
    require: true,
  },

  category: String,
  fromDate: {
    type: Date,
  },
  toDate: {
    type: Date,
  },
  featureImage: {
    type: String,
  },
  cardImage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const UpcomingEvents = mongoose.model("UpcomingEvent", eventsSchema);

module.exports = UpcomingEvents;
