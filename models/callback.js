const mongoose = require('mongoose');

const callbackSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    }
});

const CallBacks = mongoose.model('Callbacks', callbackSchema);
module.exports = CallBacks;