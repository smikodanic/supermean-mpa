/**
 * ************** /server/app/index.js
 * Main application file
 * - set view engine
 * - middlewares
 * - routing
 */

var config = require('./config');
var express = require('express');
var app = express();
var path = require('path');


//***** VIEW ENGINE *****
//***********************
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//***** MIDDLEWARES *****
//***********************
require('./middlewares/logger_morgan.js')(app, config); //must be first to log each request (also static files)
require('./middlewares/debug.js')(app, config);
require('./middlewares/errors.js')(app, config);
require('./middlewares/favicon.js')(app);
// require('./middlewares/cookieParser.js')(app);
require('./middlewares/bodyParser.js')(app);
// require('./middlewares/connect_flash.js')(app);


//=-=-= database middlewares
// var dbConfig = config.env.database.mongodb[0]; //default database
// require('./middlewares/database/' + dbConfig.driver + 'Driver.js').konektDefault(dbConfig);

//=-=-= virtual host
// require('./middlewares/virtual_host.js')(app, config);

//=-=-= static file middlewares --- path.join() creates absolute path from root
app.use('/assets', express.static(path.join(__dirname, '/assets')));
app.use('/bower', express.static(path.join(__dirname, '/../../bower_components')));

//=-=-= auth middlewares
// require('./middlewares/auth/passport.js')(app); //passport common middleware
// require('./middlewares/auth/passport_local.js')();
// require('./middlewares/auth/passport_facebook.js')();
// require('./middlewares/auth/passport_twitter.js')();
// require('./middlewares/auth/passport_google.js')();
// require('./middlewares/auth/express-session.js')(app);




//****** SERVER SIDE ROUTES *****
//*******************************
app.use('/', require('./routes/index.js'));


/* endpoint: GET /404 */
app.use(function (req, res) {
    'use strict';
    var vdata = {
        title: 'Page Not Found',
        desc: 'Error 404: web page not found.',
        keywords: '404, not found'
    };
    res.status(404).render('_errors/error404', vdata);
});


module.exports = app;
