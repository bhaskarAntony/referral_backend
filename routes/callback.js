const express = require('express');
const { postCallback, getAllCallbacks, updateCallback, deleteCallback } = require('../controlles/callback');
const router = express.Router();


router.post('/new/callback', postCallback);
router.get('/callbacks/list', getAllCallbacks);
router.patch('/update/callback', updateCallback);
router.delete('/delete/callback', deleteCallback);


module.exports = router;