const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const onlineUserSchema = Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    socketId: {
        type:String,
        maxlength:50
    },
    status:{
        type:String,
        maxlength:50
    },
    lastSeen:{
        type: Date,
        default: new Date()
    },
    user_id:{
        type:String,
        unique: 1
    },
    history : [
        {id: String,
        email:String
        }

    ]
},{ timestamps: true })

const OnlineUser = mongoose.model('chat_users', onlineUserSchema);
module.exports = { OnlineUser }