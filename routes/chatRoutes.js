const express = require("express");
const blogController = require("./../controllers/blogController");
const { Chat } = require("../models/messageModel");
const { OnlineUser } = require("../models/userStatusModel");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("clientFrontEnd/chat")
})
//get all the  users
router.get("/users", (req, res) => {
  OnlineUser.find({})
    .then((data) => {
      let userArray = [];
      data.map((value, index) => {
        let data1 = Object.assign({}, value._doc);
        delete data1.history;
        userArray.push(data1);
      });
      res.json(userArray);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/users/:id", (req, res) => {
  OnlineUser.find({ user_id: req.params.id })
    .then((data) => { res.json(data) })
    .catch((e) => { res.json(e) });
})

router.post("/add", (req,res)=>{
  
  let user1 = req.body.user;
  let online_user = new OnlineUser({
    name: user1.firstName,
    email: user1.email,
    socketId: null,
    status: "offline",
    lastSeen: new Date(),
    user_id: user1._id,
  });
  OnlineUser.find({ email: user1.email }).then((data) => {
    if (data.length === 0) {
      online_user
        .save()
        .then((response) => {
          console.log(`${user1.firstName} is registered`);
        })
        .catch((err) => {
          console.log(err.message);
        });
  } else {
    console.log("user already registered");
  }
  });
})


router.post("/getSentMessagesOnly", async (req, res) => {
  let sender = req.body.sender;
  let recentMessages = [];
  await OnlineUser.find({ user_id: sender })
    .then(async (data) => {
      var result = await Promise.all(
        data[0].history.map(async (value, index) => {
          await Chat.find({
            $or: [
              { sender: sender, receiver: value.id },
              { receiver: sender, sender: value.id },
            ],
          })
            .sort({_id: -1 })
            .limit(10)
            .then((result) => {
              if (result.length !== 0) {
                recentMessages.push(result);
              }
            })
            .catch((err) => {
              console.log(err.message);
              res.json({ msg: err.message });
            });
        })
      );
    })
    .catch((err) => {
      console.log(err.message);
      res.json({ msg: err.message });
    });
  res.json({ recentMessages });
});

//Get All Messages for Particular user
router.post("/allMessagesAll", async (req, res) => {
  let receiver = req.body.receiver;
  let sender = req.body.sender;
  Chat.find({
    $or: [
      { sender: sender.user_id, receiver: receiver.user_id },
      { receiver: sender.user_id, sender: receiver.user_id },
    ],
  })
    .then((result) => {
      console.log("Found", result.length);
      res.json({ result });
    })
    .catch((err) => {
      console.log(err.message);
      res.json({ msg: err.message });
    });
});


router.post("/allMessages", (req, res) => {
  let receiver = req.body.receiver;
  let sender = req.body.sender;
  Chat.find({
    $or: [
      { sender: sender.user_id, receiver: receiver.user_id },
      { receiver: sender.user_id, sender: receiver.user_id },
    ],
  })
    .sort({ _id: -1 })
    .skip(req.body.skip * 20)
    .limit(req.body.limit || 20)
    .then((result) => {
      console.log("Found", result.length);
      res.json({ result });
    })
    .catch((err) => {
      console.log(err.message);
      res.json({ msg: err.message });
    });
});


module.exports = router;
