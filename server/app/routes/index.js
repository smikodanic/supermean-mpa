/**
 * ***** /server/app/routes/index.js
 * SuperMEAN root endpoints
 */

var config = require('../config');
var express = require('express');
var router = express.Router();


/* endpoint: GET / */
router.get('/', function (req, res) {
    'use strict';
    var vdata = {
        title: 'SuperMean - MPA',
        desc: 'SuperMEAN-MPA is framework for fast development of Multi Page Apps in NodeJS, ExpressJS.',
        keywords: 'supermean, supermean mpa, multi page app, multi page application, nodejs, expressjs'
    };
    res.render('public/index', vdata);
});


/* endpoint: GET /page */
router.get('/page', function (req, res) {
    'use strict';
    var vdata = {
        title: 'SuperMean - MPA',
        desc: 'SuperMEAN-MPA is framework for fast development of Multi Page Apps in NodeJS, ExpressJS.',
        keywords: 'supermean, supermean mpa, multi page app, multi page application, nodejs, expressjs'
    };
    res.render('public/page', vdata);
});


module.exports = router;
