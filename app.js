var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var twitterRouter = require('./routes/twitter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/twitter', twitterRouter);


// var Twitter = require('twitter');
// var config = require('./config.js');
// var T = new Twitter(config);



// /* GET home page. */
// app.post('/twitter', function(req, res, next) {
// 	console.log('please');
// 	// Set up your search parameters
// 	var params = {
// 	  q: '#nodejs',
// 	  count: 10,
// 	  result_type: 'recent',
// 	  lang: 'en'
// 	}
// 	console.log('we made it to twitter route');
// 	var searchStr = req.body.search;
// 	// Initiate your search using the above paramaters
// 	T.get('search/tweets', params, function(err, data, response) {
// 	  // If there is no error, proceed
// 	  if(!err){
// 	    // Loop through the returned tweets
// 	    for(let i = 0; i < data.statuses.length; i++){
// 	      // Get the tweet Id from the returned data
// 	      let id = { id: data.statuses[i].id_str }
// 	      // Try to Favorite the selected Tweet
// 	      T.post('favorites/create', id, function(err, response){
// 	        // If the favorite fails, log the error message
// 	        if(err){
// 	          console.log(err[0].message);
// 	        }
// 	        // If the favorite is successful, log the url of the tweet
// 	        else{
// 	          let username = response.user.screen_name;
// 	          let tweetId = response.id_str;
// 	          console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
// 	        }
// 	      });
// 	    }
// 	      res.render('twitter', { search: 'Express' });
// 	  } else {
// 	    console.log(err);
// 	  }
// 	});


// });
// app.use('/twitter', (req,res) => console.log('we got to twitter in app.js'));
// app.use('/twitter', twitterRouter);

app.use('/dumb', function(req, res, next) {
	console.log('found');
	// console.log('twitter user: ' + req.params.twitterUser);
	console.log('twitter user: ' + req.body.twitterUser);
  	res.render('dumb', {user: req.body.twitterUser});
});

app.use('/fucky', function(req,res){
	console.log('fucky was hit');
});

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
  res.render('error');
});


app.use('fuck', function(req,res){
	console.log('/fuck was reached');
});
module.exports = app;
