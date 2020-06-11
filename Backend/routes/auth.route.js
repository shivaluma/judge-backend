const express = require('express');
const router = express.Router();
const passport = require('passport');
const googleAuth = passport.authenticate('google-token');
const authController = require('../controllers/auth.controller');

router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignUp);

router.post('/google', googleAuth, authController.postGoogle);

module.exports = router;
