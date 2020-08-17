const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/auth.controller');

router.get('/check-email', authController.getCheckEmailValid);
router.get('/check-username', authController.getCheckUsernameValid);
router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignUp);

router.post('/google', authController.postGoogle);
router.post('/facebook', authController.postFacebook);

router.post('/update-username', authController.postUpdateUsername);

router.post('/forgot-password', authController.postForgotPassword);

module.exports = router;
