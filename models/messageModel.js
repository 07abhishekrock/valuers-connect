mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = mongoose.Schema(
  {
    message: {
      type: String,
    },
    sender: {
      type: String,
    },
    receiver: {
      type: String,
    },
    type: {
      type: String,
    },
    status: {
      type: String,
    },
    sent_at: {
      type: Date,
      default:null,
    },
    delivered_at: {
      type: Date,
      default: null,
    },
    seen_at:{
        type: Date,
        default: null
    }
  },
  { timestamps: true }
);

const Chat = mongoose.model("chat", chatSchema);
module.exports = { Chat };
