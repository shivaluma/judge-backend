const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticate = passport.authenticate('jwt', { session: false });
//Import Controlers

router.delete('/logout', (req, res) => {});

// only return name and avatar
// remember to add auth middleware
router.get('/me', authenticate, (req, res) => {
  return res.status(200).json({ message: 'OK' });
});

// return full user profile
router.get('/profile', (req, res) => {});

module.exports = router;
