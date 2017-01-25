var config = require('../config');
const express = require('express');
const router = express.Router();


router.get('/', require('./index.js').home);
router.get('/page', require('./index.js').page);


module.exports = router;