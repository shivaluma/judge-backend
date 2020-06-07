const express = require('express');
const router = express.Router();

//Import Controlers
const authController = require('../controllers/auth.controller')



router.post('/login', authController.postLogin);

router.post('/signup', (req, res) => {});

router.delete('/logout', (req, res) => {});

// only return name and avatar
// remember to add auth middleware
router.get('/me', (req, res) => {
  return res.status(200).json({ message: 'OK' });
});

// return full user profile
router.get('/profile', (req, res) => {});

module.exports = router;
