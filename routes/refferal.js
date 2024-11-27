const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Referral = require('../models/referral');
const user = require('../models/user');
const routes = express.Router();

// Route to create a new referral
routes.post('/new/referral', async (req, res) => {
  const { fullname, course, couponCode, friendphonenumber } = req.body;

  // Generate a unique referral ID with uuid
  const referralId = uuidv4().slice(0, 10); // Slice to make it a 10-character ID if needed
  try {
    // Create and save the new referral
    const newReferral = new Referral({
      fullname,
      course,
      couponCode,
      referralId,
      friendphonenumber
    });
    await newReferral.save();

    // Find the user associated with the couponCode
    const userdata = await user.findOne({ couponCode });
    if (userdata) {
      userdata.sharesData.push({
        referralId: referralId,
        isregistered: false,
      });
      await userdata.save(); // Save the updated user data
    }

    res.json({
      success: true,
      link: `https://referral-frontend-phi.vercel.app//enroll/course/${referralId}/${couponCode}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error creating referral link', error });
  }
});
// Route to get a single referral by referralId
routes.get('/referral/:referralId', async (req, res) => {
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
});


routes.get('/all/referrs', async(req, res)=>{
  try {
    const allData = await Referral.find();
    res.status(200).json({allData});
  } catch (error) {
    res.status(200).json({error});
  }
})



module.exports = routes;
