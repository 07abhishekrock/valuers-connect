const mongoose = require("mongoose");
const validator = require("validator");

const NotificationSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		// unique: true,
	},
	url:{
        type:String,
        required:true
    },

	createdAt: {
		type: Date,
		default:new Date()
	},
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
