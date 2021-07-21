const mongoose = require("mongoose");
const validator = require("validator");

const projectSchema = new mongoose.Schema({
    name:{
		type:String
	},
    category:{
		type:String
	},
	institutionName: {
		type: String,
		required: true,
	},
	
	propertyDetails: {
		type: String,
		require: true,
	},

	applicationDeadline	: {
		type: Date,
	},

	auctionDate	: {
		type: Date,
	},

	reservePrice	: {
		type: Number,
	},
	currency:{
		type:String,
		default:'₹'
	},
	projectDocuments: String,

	organizationDetail: {
		type: String,
	},
	assetLocation: {
		type: String,
	},
	assetCity: {
		type: String,
	},
	createdAt: {
		type: Date,
		default:new Date()
	},
	
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
