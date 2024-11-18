// controllers/referralController.js
const ReferredUser = require('../models/ReferredUser');
const Referral = require('../models/referral'); // Ensure referral validation by referralId
const user = require('../models/user');
const nodemailer = require('nodemailer')
const express = require('express');
const crypto = require('crypto');
const OTP = require('../models/otp');
const { log } = require('console');


const app = express();






// Controller to get a referral by ID
exports.getReferralById = async (req, res) => {
  const { referralId } = req.params;

  try {
    const referral = await Referral.findOne({ referralId });
    if (!referral) {
      return res.status(404).json({ success: false, message: 'Referral not found' });
    }
    res.json({ success: true, referral });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching referral' });
  }
};

// Function to generate a random OTP
function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

// Function to send OTP email
async function sendOTPEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bhaskarbabucm6@gmail.com', 
      pass: 'qjmlrvosxcqjzmlg',   
    },
  });

  const mailOptions = {
    from: 'bhaskarbabucm6@gmail.com',   
    to: email,
    subject: 'Your OTP for Referral Registration',
    html: `
    <h2>Your OTP for Referral Registration</h2>
    <p>Use the following OTP to complete your registration:</p>
    <h3>${otp}</h3>
    <p>This OTP will expire in 1 minute.</p>
  `,
  };

  return transporter.sendMail(mailOptions);
}

exports.saveReferralDetails = async (req, res) => {
  const { otp, email } = req.body;

  const otpData = await OTP.findOne({email});
  console.log(otpData);
 

  try {
    const { fullname, phoneNumber, course, couponCode, referralId } = otpData;
    // Check if the referral ID exists in the Referral model
    const referralExists = await Referral.findOne({ referralId });
    if (!referralExists) {
      return res.status(404).json({ success: false, message: 'Referral ID not valid' });
    }

   
    
    
    // Check if OTP exists in the session and if it's expired
    const sessionOTP = otpData.otp;
    const otpTimestamp = otpData.createdAt;
    const sessionEmail = otpData.email;

    // Validate the email first
    console.log(email, sessionEmail);
    
    if (email !== sessionEmail) {
      return res.status(400).json({ success: false, message: 'Email does not match the session.' });
    }

    // // OTP expiry check
    if (!sessionOTP || Date.now() - otpTimestamp > 100000000000000000) {
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
    }

    // If OTP matches
    if (otp !== sessionOTP) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // Save referred user details
    const referredUser = new ReferredUser({
      fullname,
      email,
      phoneNumber,
      course,
      referralId,
      couponCode,
    });

    await referredUser.save();

    // Update the referrer's data
    const referrer = await user.findOne({ couponCode });
    if (referrer) {
      referrer.coins += 0.5; // Add coins to the referrer

      // Update the referral data to mark the user as registered
      const referralData = referrer.sharesData.find(
        (data) => data.referralId === referralId
      );
      if (referralData) {
        referralData.isregistered = true;
      }

      await referrer.save(); // Save the updated referrer data
    }

   await OTP.findByIdAndDelete(otpData._id);
    

    res.json({
      success: true,
      message: 'registered  successfully',
      referredUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error saving referred user details', error });
  }
};



exports.sendOTP = async (req, res) => {
  const { referralId } = req.params;
  const { fullname, email, phoneNumber, course, couponCode } = req.body;

  try {
    // Log session to see if it's initialized
    console.log("Session at sendOTP start:", req.session);

    // // Check if session exists
    // if (!req.session) {
    //   return res.status(500).json({ success: false, message: 'Session not initialized' });
    // }

    // Generate OTP
    const generatedOTP = generateOTP();
    console.log('Generated OTP:', generatedOTP);

    // Send OTP email to the referred user
    await sendOTPEmail(email, generatedOTP);

    // // Store OTP and timestamp in session tied to user
    // req.session.otp = generatedOTP;
    // req.session.otpTimestamp = Date.now();
    // req.session.email = email; 
    // req.session.fullname = fullname; 
    // req.session.course = course; 
    // req.session.phoneNumber = phoneNumber; 
    // req.session.referralId = referralId; 
    // req.session.couponCode = couponCode; 

    // Log session after storing OTP
    // console.log("Session after OTP stored:", req.session);

    const newOTP = new OTP({fullname, email, course, couponCode, referralId, phoneNumber, otp:generatedOTP})
    await newOTP.save();
    res.json({
      success: true,
      message: 'OTP sent successfully',
      data:newOTP
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error sending OTP', error });
  }
};
