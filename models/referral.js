const mongoose = require('mongoose');
const referralSchema = new mongoose.Schema({
    fullname: String,
    course: String,
    couponCode: String,
    referralId: String,
    friendphonenumber:String
  });
  
  const Referral = mongoose.model('Referral', referralSchema);
  module.exports = Referral;