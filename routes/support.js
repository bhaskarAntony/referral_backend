const express = require('express');
const { postSupport, getAllSupport, updateSupport, deleteSupport } = require('../controlles/support');
const router = express.Router();


router.post('/new/support', postSupport);
router.get('/support/list', getAllSupport);
router.patch('/update/support', updateSupport);
router.delete('/delete/support', deleteSupport);


module.exports = router;