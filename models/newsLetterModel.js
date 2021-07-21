const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const newsLetterSchema = Schema({
    description: {
        type:String,
    },
    filelink: {
        type:String,
    },
    createdAt : {
        type:Date,
        default:new Date()
    }
},{ timestamps: true })

const NewsLetter = mongoose.model('newsletter', newsLetterSchema);
module.exports = { NewsLetter }