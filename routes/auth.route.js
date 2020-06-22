const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/auth.controller');

router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignUp);

router.post('/google', authController.postGoogle);
router.post('/facebook', authController.postFacebook);
module.exports = router;
