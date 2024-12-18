const express = require('express');
const { getAllTrips, getSingleTrip } = require('../controlles/adminController');

const router = express.Router();

router.get('/trips', getAllTrips);
router.get('/trip/:id', getSingleTrip);

module.exports = router;
