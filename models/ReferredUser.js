// models/ReferredUser.js
const mongoose = require('mongoose');

const referredUserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  course: {
    type: String,
    required: true,
  
  },
  referralId: {
    type: String,
    required: true,
    ref: 'Referral',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  couponCode:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model('ReferredUser', referredUserSchema);
