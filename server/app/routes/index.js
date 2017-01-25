/**
 * GET /
 */
module.exports.home = function (req, res) {
    'use strict';
    var vdata = {
        title: 'SuperMean - MPA',
        desc: 'SuperMEAN-MPA is framework for fast development of Multi Page Apps in NodeJS, ExpressJS.',
        keywords: 'supermean, supermean mpa, multi page app, multi page application, nodejs, expressjs'
    };
    res.render('public/index', vdata);
};


/**
 * GET /page
 */
module.exports.page = function (req, res) {
    'use strict';
    var vdata = {
        title: 'SuperMean - MPA',
        desc: 'SuperMEAN-MPA is framework for fast development of Multi Page Apps in NodeJS, ExpressJS.',
        keywords: 'supermean, supermean mpa, multi page app, multi page application, nodejs, expressjs'
    };
    res.render('public/page', vdata);
};

