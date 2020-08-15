const express = require('express');
const router = express.Router();
const discussController = require('../controllers/discuss.controller');

router.get('/', discussController.getTags);

module.exports = router;
