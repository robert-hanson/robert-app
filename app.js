var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var twitterRouter = require('./routes/twitter');
var reactRouter = require('./routes/react');
var mongoRouter = require('./routes/mongo');

var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = config.db.connectionString;
mongoose.connect(mongoDB, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// bind routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/twitter', twitterRouter);
app.use('/react', reactRouter);
app.use('/mongo', mongoRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  //TODO replace back to above
  console.log(err);
  res.send(err);
});


module.exports = app;
