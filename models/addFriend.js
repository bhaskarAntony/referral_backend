const mongoose = require('mongoose');

const addFriendsSchema = new mongoose.Schema({
    friendname:{
        type:String,
        required:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    referredby:{
        type:String,
        required:true
    }
});

const AddedFriends = mongoose.model('AddedFriends', addFriendsSchema);
module.exports = AddedFriends;