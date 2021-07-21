const mongoose = require("mongoose");
const validator = require("validator");

const bannerSchema = new mongoose.Schema({
	bannerImage: {
		type: String,
	},
	createdAt: {
		type: Date,
        default:new Date()
	},
});

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;
