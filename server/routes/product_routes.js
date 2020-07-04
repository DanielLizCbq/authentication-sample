var express = require('express');
var router = express.Router();
var ProductController = require('../controllers/ProductController');

router.get('/', ProductController.all);

module.exports = router;