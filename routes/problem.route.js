const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticate = passport.authenticate('jwt', { session: false });
const problemController = require('../controllers/problem.controller');
const isProblemAdmin = require('../middleware/isProblemAdmin');

router.get('/list', problemController.getProblems);
router.get('/', problemController.getProblem);
router.post('/', authenticate, isProblemAdmin, problemController.createProblem);
router.delete(
  '/',
  authenticate,
  isProblemAdmin,
  problemController.deleteProblem
);

module.exports = router;
