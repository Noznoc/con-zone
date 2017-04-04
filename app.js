// code adapted from http://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/#.WLNT_vkrJPb

var express = require('express'); // imports framework into app
var path = require('path'); // path is a Node module for working with and handling paths
var logger = require('morgan'); // Express middleware for logging requests and responses
var bodyParser = require('body-parser'); // adds a body object to your request so that you can access POST parameters
//var favicon = require('serve-favicon');
//var cookieParser = require('cookie-parser'); 

// paths to routers
var index = require('./routes/index');
var directory = require('./routes/directory');
var contribute = require('./routes/contribute');
var contact = require('./routes/contact');
var glossary = require('./routes/glossary');
var about = require('./routes/about');
var allstandards = require('./routes/all-standards');
var onestandard = require('./routes/get-standard');
var renderstandard = require('./routes/render-standard');
var inventorySearch = require('./routes/inventory-search');
var create = require('./routes/create-standard');
var post = require('./routes/post');

var app = express(); // initate app
app.use(express.static(path.join(__dirname, 'public'))); // tells app to use the /public directory

// view engine setup
app.set('views', path.join(__dirname, 'views')); // path.join() normalises all the arguments into a path string. _dirname = global and 'views' = file/folder name
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html'); // set the view engine to html

app.use(logger('dev')); // logs the requests to the console
app.use(bodyParser.json()); // gives app the ability to parse JSON
app.use(bodyParser.urlencoded({ extended: false })); // allows app to read data from URLs
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(cookieParser()); // adds cookie object to all requests you get

// create routes from the above paths to the following html pages 
app.use('/index', index); 
app.use('/directory', directory);
app.use('/contribute', contribute);
app.use('/contact', contact);
app.use('/glossary', glossary);
app.use('/about', about);
app.use('/directory', allstandards);
app.use('/directory', onestandard);
app.use('/directory', renderstandard);
app.use('/inventory-search', inventorySearch);
app.use('/contribute', create);
app.use('/contribute', post);
app.use('/contact', post);

// catch 404 and forward to error handler. 404 error indicates the app ran out of options
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.render('error.jade')
  res.status(err.status || 500);
});

module.exports = app;
