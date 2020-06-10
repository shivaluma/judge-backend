const express = require('express');
const router = express.Router();
const passport = require('passport');
const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false,
});
const authController = require('../controllers/auth.controller');

router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignUp);

router.get('/google', googleAuth, authController.postGoogle);
router.get('/google/callback', googleAuth, authController.postGoogleCallback);

router.post('/google', googleAuth, authController.postGoogle);
router.post('/google/callback', googleAuth, authController.postGoogleCallback);

module.exports = router;
