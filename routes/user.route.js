const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticate = passport.authenticate('jwt', { session: false });
const userController = require('../controllers/user.controller');
//Import Controlers

router.delete('/logout', (req, res) => {});

// only return name and avatar
// remember to add auth middleware
router.get('/me', authenticate, userController.getMe);

// return full user profile
router.get('/profile', (req, res) => {});

router.get('/find', userController.getUser);

module.exports = router;
