const path = require("path");
const express = require("express");

const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");

const cookieParser = require("cookie-parser");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const viewRouter = require("./routes/viewRoutes");
const forumThreadRouter = require("./routes/forumRoutes/forumThreadRoutes");
const forumRepliesRouter = require("./routes/forumRoutes/forumRepliesRoutes");
const userRouter = require("./routes/userRoutes");
const newsRouter = require("./routes/newsRoutes");
const tenderRouter = require("./routes/tenderRoutes");
const upcomingEventsRouter = require("./routes/upcomingEventsRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const blogRouter = require("./routes/blogRoutes");
const projectRouter = require("./routes/projectRoutes");
const bannerRouter = require("./routes/bannerRoutes");
const jobRouter = require("./routes/jobRoutes");
const stripeRouter = require("./routes/stripeRoutes");
const chatRouter = require("./routes/chatRoutes");
const newsLetterRouter = require("./routes/newsLetterRoutes");
const captchaRoutes = require("./routes/captchaRoutes");
// const homePageRouter = require("./controllers/viewController/banner");
const authController = require("./controllers/authController");
const contactFormRoutes = require("./routes/contactformRoutes");

const multer=require('multer')


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/bannerHomePage')
	console.log(req.files);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `banner-${Date.now()}.${ext}`)
  }
})


const upload = multer({
  storage: multerStorage,
});



const News = require("./models/newsModel");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message:"Too many accounts created from this IP, please try again after an hour"
});

//  apply to all requests
app.use("/api/",limiter);


app.use(express.json({limit: '50mb'}));

app.use(
  express.urlencoded({
    extended: true,
	limit: '50mb'
  })
);
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
// app.use(hpp());


// app.use((req, res, next) => {
// 	console.log(req.cookies);
// 	next();
// });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(`${__dirname}/public`));

app.get("/threads", (req, res) => {
	res.render("clientFrontEnd/userprofilenew", { user: 0 });
});

//View Routes

app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/forum-thread", forumThreadRouter);
app.use("/api/v1/forum-replies", forumRepliesRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/tender", tenderRouter);
app.use("/api/v1/upcoming-events", upcomingEventsRouter);
app.use("/api/v1/blog", blogRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/banner", bannerRouter);
app.use("/api/v1/job", jobRouter);
app.use("/", viewRouter);
app.use("/api/v1/payment",stripeRouter);
app.use("/api/v1/chat",chatRouter);
app.use("/api/v1/newsletter",newsLetterRouter);
app.use("/api/v1/captcha",captchaRoutes);
app.use("/api/v1/contactform",contactFormRoutes);




app.get("/registration", (req, res, next) => {
	res.render("clientFrontEnd/registrationmulti");
});
app.get("/admin/bloglist", (req, res, next) => {
	res.render("adminFrontEnd/bloglistadmin");
});
app.get("/updateblogadmin", (req, res, next) => {
	res.render("clientFrontEnd/projectsAllclient");
});
// app.get("/user/userprofilenew",(req,res,next)=>{
// 	res.render("clientFrontEnd/userprofilenew")
// })
app.get("/updatenewprofile",(req,res,next)=>{
	res.render("clientFrontEnd/registrationmulti")
})
app.get("/adminupdateevent/:id",(req,res,next)=>{
	res.render("adminFrontEnd/eventUpdate")
})
app.get("/updatethread/:id",(req,res,next)=>{
	res.render("adminFrontEnd/updateThread")
})
app.get("/updateblogadmin/;id",(req,res,next)=>{
	res.render("adminFrontEnd/updateBlogAdmin")
})
app.get("/admin/updateproject/dataArr",(req,res,next)=>{
	res.render("adminFrontEnd/updateProjectAdmin")
})
app.get("/admin/updatenotification",(req,res,next)=>{
	res.render("adminFrontEnd/updateNotificationadmin")
})
app.get("/approve",(req,res,next)=>{
	res.render("adminFrontEnd/approveForum")
})
app.get("/admin/forumlist",(req,res,next)=>{
	res.render("adminFrontEnd/ForumList")
})
app.get("/admin/category",(req,res,next)=>{
	res.render("adminFrontEnd/categoryreports")
})
app.get("/admin/createNewsletter",(req,res,next)=>{
	res.render("adminFrontEnd/createNewsLetter.ejs")
})

app.get("/admin/listNewsletter",(req,res,next)=>{
	res.render("adminFrontEnd/newsletter_list.ejs")
})

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this Server`, 404));
});




// app.get('/api/v1/forum',getAllForum)
// app.post('/api/v1/forum',addNewForum)
// app.get('api/v1/forum/:id',getSingleForum)
// app.patch('/api/v1/forum/:id',updateForum)
// app.delete('/api/v1/forum/:id',deleteForum)
app.use(globalErrorHandler);

module.exports = app;
