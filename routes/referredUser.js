// routes/referralRoutes.js

const express = require('express');
const { getReferralById, saveReferralDetails, sendOTP } = require('../controlles/referredUserController');
const router = express.Router();

// Route to get a referral by referralId
router.get('/referral/:referralId', getReferralById);

// Route to save referred user’s details
router.post('/referral/register', saveReferralDetails);
router.post('/send/otp/:referralId', sendOTP);

module.exports = router;
