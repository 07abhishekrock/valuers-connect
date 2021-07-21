const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
const cors = require("cors");
dotenv.config({ path: "./config.env" });
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

const { Chat } = require("./models/messageModel");
const { OnlineUser } = require("./models/userStatusModel");
app.use(cors());
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB Connection Successfull");
  });

console.log(process.env.NODE_ENV);

const convertTimeFormat = (date_object)=>{
  let hours = Math.floor(date_object.getHours() / 10) === 0 ? '0'+date_object.getHours() : date_object.getHours();
  let minutes = Math.floor(date_object.getMinutes() / 10) === 0 ? '0'+date_object.getMinutes() : date_object.getMinutes(); 
  let meridian_value = (date_object.getHours >= 0 || date_object.getHours < 12) ? 'AM' : 'PM';

  return [hours , minutes , meridian_value];
}

const PORT = 3500;

io.on("connect", (socket) => {
  //registering the online users
  socket.on("register", function (user) {
    let user1 = user.user;
    let online_user = new OnlineUser({
      name: user1.firstName,
      email: user1.email,
      socketId: socket.id,
      status: "online",
      lastSeen: new Date(),
      user_id: user1._id,
    });
    OnlineUser.find({ email: user1.email }).then((data) => {
      if (data.length === 0) {
        online_user
          .save()
          .then((response) => {
            console.log(`${user.user.firstName} and Id ${socket.id} is online`);
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        OnlineUser.findOneAndUpdate(
          { email: user1.email },
          { socketId: socket.id, status: "online", lastSeen: new Date() }
        )
          .then((data) => {
            console.log("update Status");
            console.log(`${user.user.firstName} and Id ${socket.id}  is online`);
            io.emit('registered',online_user);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  });

  //sending typing  message to a particular user
  socket.on("typing", function (data) {
    let value = socket.to(data.id).emit("typing", {
      msg: "typing",
      sender: data.sender,
      receiver: data.receiver,
    });
    console.log(value);
  });

  //sending stopped typing  message to a particular user
  socket.on("stop typing", function (data) {
    socket.to(data.id).emit("stop typing", {
      msg: "Stopped typing",
      sender: data.sender,
      receiver: data.receiver,
    });
  });

  //sending a private chat to a user
  socket.on("private_chat", async function (data) {
    console.log(data.receiver);
    await OnlineUser.find({ email: data.sender.email })
      .then(async (result) => {
        let element = { id: data.receiver.user_id, email: data.receiver.email };
        let count = 0;
        await result[0].history.map((value) => {
          if (value.email === data.receiver.email) {
            count++;
          }
        });
        if (count > 0) {
          console.log("receiver present");
        } else {
          console.log("receiver not present");
         await OnlineUser.findOneAndUpdate(
            { email: data.sender.email },
            {
              $push: {
                history: {
                  id: data.receiver.user_id,
                  email: data.receiver.email,
                },
              },
            }
          )
            .then((data) => {
              console.log("Updated Sender Status");
            })
            .catch((err) => {
              console.log(err.message);
            });

         await OnlineUser.findOneAndUpdate(
            { email: data.receiver.email },
            {
              $push: {
                history: {
                  id: data.sender.user_id,
                  email: data.sender.email,
                },
              },
            }
          )
            .then((data) => {
              console.log("Updated Receiver Status");
            })
            .catch((err) => {
              console.log(err.message);
            });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
    await OnlineUser.find({ email: data.receiver.email })
      .then(async (result) => {
        let current_date = new Date();
        console.log(result[0].status);
        if (result[0].status !== "offline") {
          let newChat = new Chat({
            message: data.msg,
            sender: data.sender.user_id,
            receiver: data.receiver.user_id,
            type: "text",
            status: "delivered",
            sent_at: new Date(),
            delivered_at: new Date(),
          });
          newChat
            .save()
            .then((result) => {
              socket.to(data.id).emit("message", {
                msg: data.msg,
                sender: data.sender,
                receiver: data.receiver,
                timestamp : convertTimeFormat(current_date)
              });
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          let newChat = new Chat({
            message: data.msg,
            sender: data.sender.user_id,
            receiver: data.receiver.user_id,
            type: "text",
            status: "sent",
            sent_at: new Date(),
            delivered_at: null,
          });
          await newChat
            .save()
            .then((result) => {
              socket.to(data.id).emit("message", {
                msg: data.msg,
                sender: data.sender,
                receiver: data.receiver,
                timestamp : convertTimeFormat(current_date)
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // user is offline
  socket.on("disconnect", function () {
    OnlineUser.findOneAndUpdate(
      { socketId: socket.id },
      { socketId: socket.id, status: "offline", lastSeen: new Date() }
    )
      .then((data) => {
        if(data){
          io.emit('detach',data.user_id);
        }
        console.log("Updated Status");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //Changing the status of messages from  sent to delivered
  socket.on("received messages", async function (data) {
    let receiver = data.receiver.user_id;
    let sender = data.sender.user_id;
    await Chat.updateMany(
      { receiver: receiver, sender: sender ,status: "sent", delivered_at: null },
      { delivered_at: new Date(), status: "delivered" }
    )
      .then(() => {
        console.log('hello');
        console.log(data.sender.socketId)
        console.log('world');
        socket.to(data.sender.socketId).emit('delivery confirm');
      })
      .catch((err) => {
        console.log(err.messge);
      });
  });




  socket.on("messages seen", async function (data) {
    let result = data;
    console.log(data);
    // console.log('hello world' , result);
    await Chat.updateMany(
      {
        receiver: result.receiver.user_id,
        sender: result.sender.user_id,
        status: "delivered",
        seen_at: null,
      },
      { seen_at: new Date(), status: "seen" }
    )
      .then(() => {
        console.log(result.sender.socketId)
        socket.to(result.sender.socketId).emit('seen confirm');
      })
      .catch((err) => {
        console.log(err.messge);
      });

  });
});



server.listen(process.env.PORT || PORT, () =>
  console.log(`Server has started.`)
);
