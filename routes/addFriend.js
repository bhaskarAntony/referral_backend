const express = require('express');
const { postFriend, getAllFriends, updateFriend, deleteFriend } = require('../controlles/addFriend');
const router = express.Router();


router.post('/new/friend', postFriend);
router.get('/friend/list', getAllFriends);
router.patch('/update/friend', updateFriend);
router.delete('/delete/friend', deleteFriend);


module.exports = router;