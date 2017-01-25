/**
 * Middleware for error manipulation.
 */
const config = require('server/app/config');
const chalk = require('chalk');
const moment = require('moment');


/**
 * Convert error to JSON and send formatted error to client.
 * @param  {Error} err - non formatted error
 * @return {Object}     - JSON formatted error message
 */
var send2client = function (err, res) {
    'use strict';

    err.status = err.status || 500;

    var errOut;
    if (config.env.name === 'dev') {
        errOut = err;
    } else {
        errOut = '';
    }

    res.status(err.status);
    res.render('_errors/error', {
        message: err.message,
        error: errOut
    });
};


/**
 * Insert error to 'log_errors' collection
 * @param  {Error}   errDoc - error document object
 * @param  {Function} next
 * @return null
 */
var send2mongo = function (err, req, next) {
    'use strict';

    //full url
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    var errDoc = {
        status: err.status || 500,
        level: err.level || 'error',
        category: err.category || 'general',
        message: err.message,
        stack: err.stack,
        verb: req.method,
        url: fullUrl,
        ip: req.client.ip,
        time: moment(),
        err_orig: err || {} //original error
    };


    log_errors_model.insertLog(errDoc)
        .catch(function (err) {
            err.category = 'log_errors';
            next(err);
        });
};



module.exports.sender = function (err, req, res, next) {
    'use strict';

    /*** OUTPUT ***/
    send2client(err, res);
    // send2mongo(err, req, next);

    //output to console (only in dev environment)
    if (config.env.name === 'dev') {
        console.log(chalk.red(err.stack));
        console.log(chalk.magenta(JSON.stringify(err, null, 4)));
    }
};




/* report error 404: Page not found!*/
module.exports.badurl = function (req, res, next) {
    'use strict';

    var vdata = {
        title: 'Page Not Found',
        desc: 'Error 404: web page not found.',
        keywords: '404, not found'
    };
    res.status(404).render('_errors/error404', vdata);
};


//catch all uncaught exceptions
module.exports.uncaught = function () {
    'use strict';

    process.on('uncaughtException', function (err) {
        console.error(chalk.red(err)); //output to console
    });
};