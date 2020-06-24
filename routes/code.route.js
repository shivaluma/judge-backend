const express = require('express');
const router = express.Router();
const playGroundController = require('../controllers/playground.controller');
//Import Controlers

router.post('/run', playGroundController.postRunCode);

module.exports = router;
