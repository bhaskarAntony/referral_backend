const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const referralSupport = mongoose.model('referralSupport', supportSchema);
module.exports = referralSupport;