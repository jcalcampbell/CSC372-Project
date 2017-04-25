var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var credentials = require('./config/credentials');

var index = require('./routes/index');

/** App Setup **/
var app = express();

// view engine setup
var handlebars = require('express-handlebars')
  .create({
    defaultLayout: 'main', extname: 'hbs',
    helpers: {
      section: function (name, option) {
        if (!this._sections) this._sections = {};
        this._sections[name] = option.fn(this);
        return null;
      }
    }
  });
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

// Middleware
app.use(favicon(path.join(__dirname, '/public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(credentials.cookieSecret));
app.use(express.static(path.join(__dirname, '/public')));

// Tests
app.use(function(req, res, next){
  res.locals.showTests = app.get('env') !== 'production' &&
    req.query.test === '1';
  next();
});

// Sets a cookie for the first time the site was accessed
app.use(function (req, res, next) {
  if(req.signedCookies.firstVisit) {
    res.locals.firstVisit = req.signedCookies.firstVisit;
  } else {
    res.locals.firstVisit = new Date().toLocaleDateString();
    res.cookie('firstVisit', res.locals.firstVisit, {signed: true, maxAge: 31557600000});
  }
  next();
});

/** Route Handlers **/
app.use('/', index);

/** Error Handling **/
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
