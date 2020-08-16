const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticate = passport.authenticate('jwt', { session: false });
const submissionController = require('../controllers/submission.controller');

router.post('/', authenticate, submissionController.createSubmission);
router.get('/', authenticate, submissionController.getSubmissions);
module.exports = router;
