const express = require('express');
const router = express.Router();
const passport = require('passport');
const authenticate = passport.authenticate('jwt', { session: false });
const discussController = require('../controllers/discuss.controller');

router.get('/', discussController.getAllDiscuss);

router.post('/', authenticate, discussController.postDiscuss);

router.get('/:discussId', discussController.getDiscuss);

router.put('/:discussId/view', discussController.putDiscussView);

router.post('/:discussId/vote', authenticate, discussController.postVote);
router.get('/:discussId/vote', authenticate, discussController.getVote);

router.post('/:discussId/comment', authenticate, discussController.postComment);
router.get('/:discussId/comment', discussController.getComment);
module.exports = router;
