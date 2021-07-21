var express = require("express");
const Tender = require("../../models/tenderModel");
const News = require("../../models/newsModel");
const Event = require("../../models/upcomingEventsModel");
const User = require("../../models/userModel");
const ForumCategory = require("../../models/forumCategoryModel");
const ForumThread = require("../../models/forumThreadModel");
const UpcomingEvents = require("../../models/upcomingEventsModel");
const Project = require("../../models/projectModel");
const Notification = require("../../models/notificationModel");
const Blog = require("../../models/blogModel");
const Banner = require("../../models/homepageModel");
const Job = require("../../models/jobModel");
const {NewsLetter} = require("../../models/newsLetterModel");

const getDayAndMonth = (date)=>{
			let new_date =new Date(date);
			let string = new_date.toDateString().split(' ');
			return [string[2],string[1]];
		}

const getDateString = (date)=>{
	let new_date = new Date(date);
	let individual_elements =  new_date.toDateString().split(' ');
	let final_date = individual_elements[0] + ', ' + individual_elements.slice(1).join(' ');
	return final_date;
}


exports.login = (req, res, next) => {
	res.render("clientFrontEnd/login");
};

exports.signup = (req, res, next) => {
	res.render("clientFrontEnd/signup");
};

exports.forgotPassword = (req, res, next) => {
	res.render("clientFrontEnd/forgotPassword");
};
exports.resetPassword = (req, res, next) => {
	res.render("clientFrontEnd/resetPassword");
};

exports.undermaintenance=async(req,res,next)=>{
	res.render("clientFrontEnd/undermaintenance")
}

//HomePage Client Frontend
exports.getHomePage = async (req, res, next) => {
	try {
		var d = new Date().getTime()
		console.log("*********************************************",d);
		const tender = await Tender.find().sort({ createdAt: 1 }).limit(8);
		const news = await News.find().sort({ createdAt: 1 });
		const news_views = await News.find().sort({ totalViews : -1 });
		const forumCategory = await ForumCategory.find().sort({ totalThreads: -1 }).limit(6);
		const notification = await Notification.find().sort({ createdAt: 1 });
		const banner = await Banner.find();
			console.log(banner);
		// const forumThread = await ForumThread.find();
		let upcomingEvents = await UpcomingEvents.find({toDate: { $gt: d }})
			.sort({ fromDate: -1 })
			.limit(8);

		upcomingEvents  = await upcomingEvents.map((value)=>{
			value.featureImage = value.featureImage.split(",")[0];
			return value;
		})

	

		res.render("clientFrontEnd/homepage_new", {
			tender,
			news,
			forumCategory,
			banner,
			// forumThread,
			upcomingEvents,
			notification,
			getDayAndMonth,
			getDateString,
			news_views
		});
	} catch (error) {
		console.log(error);
	}
};

exports.getForumThreadPage = async (req, res, next) => {
	let category = await ForumCategory.findById(req.query.category);
	res.render("clientFrontEnd/forum-threadPage",{category});
};
exports.getAllForumCategories = async (req, res, next) => {
	try{
		const forumCategory = await ForumCategory.find().sort({totalThreads : -1}).limit(20);
		let upcomingEvents = await UpcomingEvents.find()
			.sort({ fromDate: -1 })
			.limit(6);

		upcomingEvents  = await upcomingEvents.map((value)=>{
			value.featureImage = value.featureImage.split(",")[0];
			return value;
		})
		res.render("clientFrontEnd/forumCategories" , {
			forumCategory,
			upcomingEvents,
			getDayAndMonth,
			getDateString,
		});
	}
	catch(e){
		console.log(e);
	}
}

exports.getDiscussionPage = async (req, res, next) => {
	try {
		const forumHead = await ForumThread.findById(req.params.id);
		// console.log(tender.tenderId);
		res.render("clientFrontEnd/discussionPage", {
			forumHead,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.getAllTender = (req, res, next) => {
	res.render("clientFrontEnd/getAllTender");
};

exports.getOneTender = async (req, res, next) => {
	try {
		const tender = await Tender.findById(req.params.id);
		if(req.user && req.user.isMember){
			res.render("clientFrontEnd/getOneTender", {
				tender,
				doc: tender.documents,
			});
		}

		else{
			if(!req.user){
				res.redirect('/login');
			}
			else{
				res.redirect('/payment?blocked=true');
			}
		}
	} catch (error) {
		console.log(error);
	}
};

exports.getAllProject = async (req, res, next) => {
	try {
		const project = await Project.find();
		res.render("clientFrontEnd/projectsAllclient", {
				project,
				doc: project.documents,
			});
		
	} catch (error) {
		console.log(error);
	}
};

exports.getOneProject = async (req, res, next) => {
	try {
		const project = await Project.findById(req.params.id);
		if(req.user && req.user.isMember){
			res.render("clientFrontEnd/singleProject", {
				project,
				doc: project.documents,
			});
		}

		else{
			console.log(req.user);
			if(!req.user){
				res.redirect('/login');
			}
			else{
				res.redirect('/payment?blocked=true');
			}
		}
	} catch (error) {
		console.log(error);
	}
};


exports.getAllJob = async(req, res, next) => {
	const job=await Job.find()
	res.render("clientFrontEnd/carrierOption",{job});
};


exports.getAllNews = (req, res, next) => {
	res.render("clientFrontEnd/getAllNews");
};



exports.getOneNews = async (req, res, next) => {
	try {
		const news = await News.findById(req.params.id);
		let images = news.featureImage.split(",");
		if(images[1] === undefined){
			news.featureImage = images[0];
		}
		else{
			news.featureImage = images[1];
		}
		res.render("clientFrontEnd/getOneNews", {
			news,
		});
	} catch (error) {
		console.log(error);
	}
};

exports.getOneEvent = async (req, res, next) => {
	try {
		const event = await Event.findById(req.params.id);
		let images = event.featureImage.split(",");
		if(images[1] === undefined){
			event.featureImage = images[0];
		}
		else{
			event.featureImage = images[1];
		}
		res.render("clientFrontEnd/getOneEvent", {
			event,
			getDateString
		});
	} catch (error) {
		console.log(error);
	}
};

exports.getAllEvents = async (req, res, next)=>{
	res.render("clientFrontEnd/getAllEvents");
}




// exports.getjob = (req, res, next) => {
// 	res.render("clientFrontEnd/carrierOption");
// };

exports.getjobDetail = async(req, res, next) => {
	const jobDetail=await Job.findById(req.params.id)
	res.render("clientFrontEnd/jobDetailSingle",{jobDetail});
};

exports.getAllBlog = (req, res, next) => {
	res.render("clientFrontEnd/getAllBlog");
};

exports.getOneBlog = async(req, res, next) => {
try {
		const blog = await Blog.findById(req.params.id);
		let images = blog.blogFeatureImage.split(",");
		if(images[1] === undefined){
			blog.blogFeatureImage = images[0];
		}
		else{
			blog.blogFeatureImage = images[1];
		}
		let upcomingEvents = await Event.find().sort({fromDate : -1});

		upcomingEvents  = await upcomingEvents.map((value)=>{
			value.featureImage = value.featureImage.split(",")[0];
			return value;
		})
		res.render("clientFrontEnd/getOneBlogUpdated", {
			upcomingEvents, 	
			blog,
			getDayAndMonth,
			getDateString
		});
		// res.render("clientFrontEnd/getOneBlog", {blog});
	} catch (error) {
		console.log(error);
}};

exports.getPricing = (req , res, next)=>{
	res.render("clientFrontEnd/pricing");
}
exports.getPaymentPage = (req,res,next)=>{

	res.render("clientFrontEnd/payment",{
		isBlocked : req.query.blocked || 0 
	});
}

// exports.getAllProject = (req, res, next) => {
// 	res.render("clientFrontEnd/projectsAllclient");
// };

exports.getUserPublicProfile = async(req, res, next) => {
try {
		const userOne = await User.findById(req.params.id);
		res.render("clientFrontEnd/userPublicProfile", {userOne});
	} catch (error) {
		console.log(error);
}};

exports.getUserPrivateProfile =async (req, res, next) => {
	try {
		const category = await ForumCategory.find();
		res.render("clientFrontEnd/userprofilenew", {
			category,
		});
	} catch (error) {
		console.log(error);
	}
};
exports.getEditUserPrivateProfile = async(req, res, next) => {
	try {
		const userOne = await User.findById(req.params.id);
		function convertToDate(date){
			date = [date.split('/')[1],date.split('/')[0],date.split('/')[2]].join('/');
			return date.replace(/\//g,'-').split('-').map(function(date_element){return date_element.length > 1 ? date_element : '0'+date_element}).reverse().join('-');
		}
		res.render("clientFrontEnd/updateprofile", {userOne,convertToDate});
	} catch (error) {
		console.log(error);
	}
};


exports.getEventClient = async(req, res, next) => {
	try {
		const data = await UpcomingEvents.findById(req.params.id);
		res.render("clientFrontEnd/upcomingEvent", {data});
	} catch (error) {
		console.log(error);
	}
};

exports.getContactUsPage = (req , res , next) =>{
	res.render('clientFrontEnd/contact_us');
}


//

//
//

//

//
//Admin Code Goes Here
exports.createJobAdmin = async (req, res, next) => {
	res.render("adminFrontEnd/createJob");
};

exports.getAllJobAdmin = async (req, res, next) => {
	res.render("adminFrontEnd/jobList");
};



exports.getAllNewsAdmin = (req, res, next) => {
	res.render("adminFrontEnd/getAllNews");
};

exports.createNewsAdmin = async (req, res, next) => {
	res.render("adminFrontEnd/createNews");
};

exports.createNewsAdminForm = async (req, res, next) => {
	try {
 const news = await News.create({

      title:req.body.title,
      content:req.body.content

    });
	res.render("adminFrontEnd/createNews", {
			news,
		});
	} catch (error) {
		console.log(error);
	}
};


exports.updateNewsAdmin = async (req, res, next) => {
	try {
		const data = await News.findById(req.params.id);
		res.render("adminFrontEnd/updateNews", {
			data,
		});
	} catch (error) {
		console.log(error);
	}
};


exports.updateJobAdmin = async (req, res, next) => {
	try {
		const found = await Job.findById(req.params.id);
		res.render("adminFrontEnd/updateJob", {
			found,
		});
	} catch (error) {
		console.log(error);
	}
};


exports.getAllUserAdmin = async(req, res, next) => {
	try {

 const signupData=await User.countDocuments()
 const paidMember=await User.countDocuments({isMember:true})
	res.render("adminFrontEnd/userList",
	{
		signupData,
		paidMember
	});
	} catch (error) {
	console.log(error);
	}
};


exports.deleteUserAdmin = async(req, res, next) => {
	try {
		const delUser = await User.findByIdAndDelete(req.params.id);
		res.redirect('/admin/userlist');
	} catch (error) {
		console.log(error);
	}
};





exports.updateUserAdmin = (req, res, next) => {
	res.render("adminFrontEnd/updateUser");
};

//
exports.getAlltenderAdmin = (req, res, next) => {
	res.render("adminFrontEnd/tenderList");
};


exports.createTenderAdmin = (req, res, next) => {
	res.render("adminFrontEnd/createTender");
};

exports.updateTenderAdmin = async (req, res, next) => {
	try {
		const data = await Tender.findById(req.params.id);
		console.log(data);
		res.render("adminFrontEnd/updateTender", {
			data,
		});
	} catch (error) {
		console.log(error);
	}
};

//

exports.getAllBlogAdmin = (req, res, next) => {
	res.render("adminFrontEnd/bloglistadmin");
};

exports.getCreateBlogAdmin = (req, res, next) => {
	res.render("adminFrontEnd/createBlogadmin");
};

exports.getUpdateBlogAdmin = async(req, res, next) => {
	try {
const blog =await Blog.findById(req.params.id)
	res.render("adminFrontEnd/updateBlogAdmin",{blog});

	} catch (error) {
		console.log(error);
	}
};




exports.createCategoryAdmin = (req, res, next) => {
	res.render("adminFrontEnd/createCategory");
};
exports.getAllCategoryAdmin = (req, res, next) => {
	res.render("adminFrontEnd/categoryreports");
};

exports.formCategoryAdmin = async(req, res, next) => {
		try {
		const category = await ForumCategory.create({
			name:req.body.name
		});
		res.render('adminFrontEnd/createCategory',category);
	} catch (error) {
		console.log(error);
	}
};

exports.deleteCategoryAdmin = async(req, res, next) => {
		try {
		const category = await ForumCategory.findByIdAndDelete(req.params.id);
		res.redirect('/admin/category');
	} catch (error) {
		console.log(error);
	}
};



exports.createEventAdmin = (req, res, next) => {
	res.render("adminFrontEnd/createEvent");
};
exports.getAllEventAdmin = (req, res, next) => {
	res.render("adminFrontEnd/upcomingEventsList");
};
exports.deleteEventAdmin = async(req, res, next) => {
	try {
		const event = await UpcomingEvents.findByIdAndDelete(req.params.id);
		res.redirect('/admin/events');
	} catch (error) {
		console.log(error);
	}
};
exports.getupdateEventAdmin = async(req, res, next) => {
	try {
		const event = await UpcomingEvents.findById(req.params.id);
		res.render('adminFrontEnd/eventUpdate',{event});
	} catch (error) {
		console.log(error);
	}
};



// exports.createJobAdmin = (req, res, next) => {
// 	res.render("adminFrontEnd/createJob");
// };
// exports.getAllJobAdmin = (req, res, next) => {
// 	res.render("adminFrontEnd/JobList");
// };



exports.createNotificationAdmin = (req, res, next) => {
	res.render("adminFrontEnd/createNotification",{message:" "});
};

exports.postFormNotification=async(req,res,next)=>{
		try {
		const notification = await Notification.create(req.body);
		res.render('adminFrontEnd/createNotification',{notification,display:'block',message:'Published'});
	} catch (error) {
		console.log(error);
	}
}
exports.getAllNotificationAdmin = async(req, res, next) => {
	try {
		const notification = await Notification.find();
		console.log(notification);
		res.render('adminFrontEnd/notificationListAdmin',
		{
			notification
		});
	} catch (error) {
		console.log(error);
	}
};
exports.deleteNotificationAdmin = async(req, res, next) => {
	try {
		const notification = await Notification.findByIdAndDelete(req.params.id);
		res.redirect('/admin/notification');
	} catch (error) {
		console.log(error);
	}
};

exports.getcreateForumAdmin=async(req,res,next)=>{
	try {
		const category = await ForumCategory.find();
		res.render("adminFrontEnd/createForumAdmin", {
			category,
		});
	} catch (error) {
		console.log(error);
	}
}

exports.deleteForumAdmin=async(req,res,next)=>{
	try {
		const category = await ForumThread.findByIdAndDelete(req.params.id);
		res.redirect("/admin/forumlist");
	} catch (error) {
		console.log(error);
	}
}


exports.forumApproveDenyAdmin=async(req,res,next)=>{
	try {
		const forum = await ForumThread.find({isApproved:false});
		res.render("adminFrontEnd/approveForum", {
			forum,
		});
	} catch (error) {
		console.log(error);
	}
}




exports.createProjectAdmin = (req, res, next) => {
	res.render("adminFrontEnd/createProjectadmin");
};
exports.getAllProjectAdmin = (req, res, next) => {
	res.render("adminFrontEnd/projectListAdmin");
};
exports.getAllBannerAdmin = (req,res,next)=>{
	res.render('adminFrontEnd/banner_image_list');
}

exports.getupdateProjectAdmin = async(req, res, next) => {
	try {
		const project = await Project.findById(req.params.id);
		console.log(project);
		res.render('adminFrontEnd/updateProjectAdmin',{project});
	} catch (error) {
		console.log(error);
	}
};





exports.getAllThreadAdmin = (req, res, next) => {
	res.render("adminFrontEnd/threadList");
};


exports.getUpdateBanner = (req, res, next) => {
	res.render("adminFrontEnd/homePageBanner");
};

exports.getNewsLetter = async (req,res,next)=>{
	const newsLetters = await NewsLetter.find();
	res.render("clientFrontEnd/newsletter.ejs" , newsLetters);
}