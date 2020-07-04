var express = require('express');
var router = express.Router();
var PersonController = require('../../controllers/PersonController');

router.get('/', PersonController.all);

module.exports = router;