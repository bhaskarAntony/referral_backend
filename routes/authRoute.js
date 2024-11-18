const express = require('express');
const { register, login, getAll } = require('../controlles/authController');
const User = require('../models/user');
const {protect} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/all/users', getAll)

router.get('/', protect, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
