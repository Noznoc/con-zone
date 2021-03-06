const express = require('express'); // imports framework into app
const path = require('path'); // path is a Node module for working with and handling paths
const logger = require('morgan'); // Express middleware for logging requests and responses
const bodyParser = require('body-parser'); // adds a body object to your request so that you can access POST parameters
const favicon = require('serve-favicon');
const http = require('http');
// var cookieParser = require('cookie-parser'); 

// paths to routers
const index = require('./routes/index');

const app = express(); // initate app
app.use(express.static(path.join(__dirname, 'public'))); // tells app to use the /public directory

// view engine setup
app.set('views', path.join(__dirname, 'views')); // path.join() normalises all the arguments into a path string. _dirname = global and 'views' = file/folder name
app.set('view engine', 'pug'); // set the view engine to pug

app.use(logger('dev')); // logs the requests to the console
app.use(bodyParser.json()); // gives app the ability to parse JSON
app.use(bodyParser.urlencoded({ extended: false })); // allows app to read data from URLs
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(cookieParser()); // adds cookie object to all requests you get

app.use('/', index);

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.render('error');
  res.status(err.status || 500);
});

module.exports = app;