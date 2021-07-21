const mongoose = require("mongoose");
const validator = require("validator");

const tenderSchema = new mongoose.Schema({
	tenderId: {
		type: String,
		required: true,
		unique: true,
	},
	title:{
		type:String
	},
	brief: {
		type: {},
		require: true,
	},

	tenderAuthority: {
		type: String,
		require: true,
	},

	openingDate: {
		type: Date,
		default:"N/A"
	},

	lastDate: {
		type: Date,
		default:"N/A"
	},

	documents: String,

	emd: {
		type: Number,
	},

	organizationDetail: {
		type: String,
	},
	createdAt: {
		type: Date,
		default : new Date()
	},
	category:{
		type:String
	},
	country:{
		type:String
	},
	live: {
		type: String,
		default: "no",
	},
});

const Tender = mongoose.model("Tender", tenderSchema);

module.exports = Tender;
