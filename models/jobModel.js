const mongoose = require("mongoose");
const validator = require("validator");

const jobSchema = new mongoose.Schema({
	position: {
		type: String,
		required: true,
		// unique: true,
	},
	location: {
		type:String,
		// require: true,
	},

	country: String,

	brief: {
		type: String,
	},
	responsibility: {
		type: String,
	},
    requirements: {
		type: String,
	},
	form:{
		type:String
	},
	createdAt: {
		type: Date,
	},
	contact_details:{
		type:String
	},
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
