const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "First Name is Required"],
		lowercase:true,
		trim: true
	},

	lastName: {
		type: String,
		require: [true, "Last Name is Required"],
		lowercase:true,
		trim: true
	},

	// Eg :- Service Provider , Invester etc
	userType: String,

	userRole: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},

	phoneNo: {
		type: String,
		required: true,
		trim: true
		// unique: [true, "Account with this number Already Exist"],
	},

	email: {
		type: String,
		required: true,
		unique: [true, "Account with this email Already Exist"],
		lowercase: true,
		validate: [validator.isEmail, "Please provide a valid Email"],
	},

	degree:Array,

	experience: Array,

	emailVerified: {
		type: Boolean,
		default: false,
	},
	website:{
		type:String,
		trim: true,
		lowercase:true
		
	},
	address:{
		type:String,
		trim:true
	},
	linkedIn:{
		type:String,
		trim: true,
		lowercase:true
	},
	whatsappNo:{
		type:String,
		trim: true,
	},
	position:{
		type:String,
		trim: true,
	},
	about:{
		type:String,
		trim: true,
	},
	phoneVerified: {
		type: Boolean,
		default: false,
	},

	isMember: {
		type: Boolean,
		default: false,
	},

	planExpires: {
		type: Date,
	},
	subscriptionType:{
		type: String
	},
	subscibedOn:{
		type: Date,
	},

	password: {
		type: String,
		required: [true, "Password is required to Signup/Login"],
		minlength: 8,
		select: false,
	},
// 	passwordConf: {
//     type: String,
//     // required: true,
//     validate: {
//       //This will work only with CREATE and SAVE
//       validator: function (el) {
//         return el === this.password;
//       },
//     },
//   },
createdAt:{
	type:Date,
	default:new Date()
},
	userProfile: {
		type: String,
		default:"/assets/profile.png",
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	this.password = await bcrypt.hash(this.password, 12);
});

userSchema.pre("save", function (next) {
	if (!this.isModified("password") || this.isNew) return next();

	this.passwordChangedAt = Date.now() - 1000;
	next();
});

userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000);
		console.log(changedTimeStamp, JWTTimestamp);
		return JWTTimestamp < changedTimeStamp;
	}

	return false;
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
