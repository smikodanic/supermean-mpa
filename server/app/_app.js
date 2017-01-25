/**
 * ************** /server/app/_app.js
 * Main application file
 * - set view engine
 * - middlewares
 * - routing
 * - error reporting
 */

/* access files from root, for example require('server/app/config') */
require('rootpath')();

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




//****** ROUTES *****
//*******************************
app.use('/', require('./routes/_routes.js'));


/******************** ERROR HANDLERS ********************/
/*******************************************************/
app.use(require('./middlewares/error.js').badurl); //404 not found middleware. Must be last middleware !
app.use(require('./middlewares/error.js').sender); //send error to client, sentry and mongo
require('./middlewares/error.js').uncaught(); //uncaught exceptions


module.exports = app;
