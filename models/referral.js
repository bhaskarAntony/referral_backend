const mongoose = require('mongoose');
const referralSchema = new mongoose.Schema({
    fullname: String,
    course: String,
    couponCode: String,
    referralId: String,
  });
  
  const Referral = mongoose.model('Referral', referralSchema);
  module.exports = Referral;