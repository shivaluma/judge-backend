const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {});

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
