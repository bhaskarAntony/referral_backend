const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    otp:{
        type:String,
        required:true
    },
    fullname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
       
      },
      phoneNumber: {
        type: String,
        required: true,
        
      },
      course: {
        type: String,
        required: true,
      
      },
      referralId: {
        type: String,
        required: true,
      },
      couponCode:{
        type:String,
        required:true
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },

});

const OTP = mongoose.model('referral_otp', otpSchema);
module.exports = OTP;