var express = require('express');
var router = express.Router();
var config = require('../config.js');
var Twitter = require('twitter')(config.twitterConfig);
// var Twitter = new Twitter(config.twitterConfig);

// databases
var Tweet = require('../models/Tweet');
var TwitterUser = require('../models/TwitterUser');
var Subscription = require('../models/Subscription');


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('twitter', {twitterData: {}});
});


router.get('/users/:userName/tweets', function(req, res, next){
	getTweetsFromUserNameAsync(req.params.userName).then(function(tweets){
		res.send(tweets);
	}).catch(function(err){
		return console.error(err);
	});
});

// Pulls latest tweets from Twitter API and archives them (duplicates are skipped)
router.get('/users/:userName/tweets/archive', function(req, res, next){
	getTweetMaxIdFromUserNameAsync(req.params.userName)
	  .then(function(sinceId){
		// fetch new tweets after last one archived
		return getTweetsFromUserNameAsync(req.params.userName, sinceId);
	}).then(function(tweets){
		// persist tweets to db
		return archiveTweets(tweets);
	}).then(function(response){
		// send report/response
		res.send(response);
	}).catch(function(err){
		return console.error(err);
	});
});

router.get('/users/:userName', function(req,res){
	getUserFromScreenName(req.params.userName)
	.then(function(user){
		res.json(user);
	})
	.catch(function(err){
		return console.error(err);
	});
});


router.post('/search', function(req,res) {
	var searchQuery = req.body.queryString;
	var searchBy = req.body.searchBy; // 'user' or 'text'
	if (searchBy == 'user'){
		searchQuery = 'from:' + searchQuery;
	}
	// var returnCount = req.body.count;
	
	// Set up your search parameters
	var params = {
	  q: searchQuery,
	  count: 100,
	  result_type: 'recent',
	  lang: 'en'
	}
	console.log('search: ' +  searchQuery);
	// Initiate your search using the above paramaters
	Twitter.get('search/tweets', params, function(err, data, response) {
		res.send(data.statuses);
	});
});


router.get('/subscriptions', function(req, res, next) {
	console.log('Fetching twitter user subscriptions...');

	Subscription.find({})
				// .populate('user')
				.exec(function(err, subscriptions){
					if (err) return console.error(err);
					res.send(subscriptions);
				});
});


router.post('/subscriptions/user/:userName', function(req,res){
	subscribeToUser(req.params.userName)
	.then(function(response){
		res.json(response);
	})
	.catch(function(err){
		console.error(err);
		res.json({
			error: err
		});
	});
});




/* GET twitter initial page. */
router.post('/search', function(req, res, next) {
	var searchQuery = req.body.searchQuery;
	
	// Set up your search parameters
	var params = {
	  q: searchQuery,
	  count: 100,
	  result_type: 'recent',
	  lang: 'en'
	}
	console.log('search: ' +  searchQuery);
	// Initiate your search using the above paramaters
	Twitter.get('search/tweets', params, function(err, data, response) {
		console.log('tweets searched...');
	  // If there is no error, proceed
	  if(!err){
	  	var outData = []; // custom var to play around with and render
	  	var formattedTweets =  [];

	    // Loop through the returned tweets
	    for(let i = 0; i < data.statuses.length; i++){
	    	var status = data.statuses[i];
	    	var text = status.text;
	    	var user = status.user;
	    	var profileImageUrl = status.profile_image_url_https;
	    	outData[i] = 
	    	{
	    		text: text, 
	    		userName: user.name, 
	    		screenName: user.screen_name,
	    		profileImageUrl: user.profileImageUrl
	    	};
	      // Get the tweet Id from the returned data
	      let id = { id: data.statuses[i].id_str }
	    }
	    console.log('body: ' + JSON.stringify(req.body));
	    if(req.body.toArchive == 'true') // must do it this way since nonempty string always evaluates to true
	    {
	    	// if checking by user, save user to our db 
	    	if (req.body.searchQuery.startsWith('from:'))
	    	{
	    		console.log('searching if user exists...');
	    		var query = {id_str: data.statuses[0].user.id_str};
	    		TwitterUser.findOne(query, function(err, newUser){
	    			if (err)
	    			{
	    				console.log('we had an error saving the user...');
	    				console.error(err);
	    			}
	    			else if (newUser)
	    			{
		    			console.log('User exists.');
		    			formattedTweets = getFormattedTweets(data.statuses, newUser);
		    			archiveAndDisplayTweets(formattedTweets, {twitterData: outData}, res);
	    			}
	    			else
	    			{
	    				console.log('user not found. adding to database....')
	    				var newTwitterUser = new TwitterUser(data.statuses[0].user);
	    				newTwitterUser.save(function(err, newUser){
	    					if(err) {
	    						console.error(err);
	    					}
	    					console.log('user saved.');
		    				formattedTweets = getFormattedTweets(data.statuses, newUser);
		    				archiveAndDisplayTweets(formattedTweets, {twitterData: outData}, res);
	    				});
	    			}

	    		});
	    	} else {
	    		console.log('Non user specific search results will not be archived...');
			  	res.render('_tweetSearchResults', {twitterData: outData});
	    	}
	    }
	    else {
	    	console.log('rendering without archiving...');
  			res.render('_tweetSearchResults', {twitterData: outData});
	    }

	  } else {
	  	console.log('busted...');
	    console.log(err);
	  }
	});


});
module.exports = router;



// function(err, newUser)
// {
// 	for (let i = 0; i < data.statuses.length; i++)
// 	{
// 		console.log('formatting tweet...');
// 		formattedTweets[i] = formatTweet(data.statuses[i], newUser);
// 	}
// }

function archiveAndDisplayTweets(tweetsToArchive, viewModel, res){
	console.log('archving tweets....');
	// save multiple documents to the collection referenced by Book Model
    Tweet.insertMany(tweetsToArchive, function (err, docs) {
		if (err){ 
			console.error(err);
		} else {
			console.log("Multiple documents inserted to Tweets");
		}
		res.render('_tweetSearchResults', viewModel);
	});
}

function getFormattedTweets(rawTweets, user)
{
	var formattedTweets = [];
	console.log('Formatting tweets....');
	for (let i = 0; i < rawTweets.length; i++)
	{
		formattedTweets[i] = formatTweet(rawTweets[i], user);
	}
	return formattedTweets;
}

function formatTweet(rawTweet, user){
	var formattedTweet = {
		created_at: rawTweet.created_at,
		id_str: rawTweet.id_str,
		text: rawTweet.text,
		source: rawTweet.source,
		truncated: rawTweet.truncated,
		in_reply_to_status_id_str: rawTweet.in_reply_to_status_id_str,
		in_reply_to_user_id_str: rawTweet.in_reply_to_user_id_str,
		in_reply_to_screen_name: rawTweet.in_reply_to_screen_name,
		user: user.id,
		quoted_status_id_str: rawTweet.quoted_status_id_str,
		is_quote_status: rawTweet.is_quote_status
	};
	return formattedTweet
}



function getTweetsFromUserNameAsync(userName, sinceId) {
	console.log(`Searching tweets from User {${userName}}`);
	return new Promise(function(resolve, reject) {
		var query = 'from:' + userName;
		var params = {
			q: query,
			since_id: sinceId,
			count: 100, // 100 is max allowed. default is 15
			tweet_mode: 'extended'
		};
		console.log('query: ' + JSON.stringify(params));
		Twitter.get('search/tweets', params, function(err, data, response) {
			if (err){
				reject(err);
			}
			resolve(data.statuses);
		});
	});
}


function getTweetMaxIdFromUserNameAsync(userName){
	return new Promise(function(resolve, reject){
		console.log(`Getting max id of {${userName}}`);
		Tweet.findOne({'user.screen_name': userName})
			.select('id_str')
			.sort({id_str: -1})
			.exec(function(err, maxId){
				console.log('maxId: ' + JSON.stringify(maxId));
				if(err) reject(err);
				var returnId = maxId ? maxId.id_str : '-1';
				resolve(returnId);
			});
	});
};


function archiveTweets(tweets){
	return new Promise(function(resolve, reject){
		console.log(`archving ${tweets.length} tweets...`);
		Tweet.insertMany(tweets, function (err, docs) {
			var docCount= docs ? docs.length : 0;
			if (err) reject(err);
			var response = {
				error: err,
				tweetsFound: tweets.length,
				tweetsArchived: docCount,
				tweets: docs
			}
			resolve(response);
		});
	});
};

function getUserFromScreenName(screenName){
	return new Promise(function(resolve, reject){
		console.log(`Search Twitter for user {${screenName}}...`);
		var params = {
			screen_name: screenName
		};
		Twitter.get('users/show', params, function(err, user, res){
			if (err) reject(err);
			resolve(user);
		});
	});
};


function getSubscribedUser(screenName){
	return new Promise(function(resolve, reject){
		console.log(`Searching subscriptions for user with id: ${screenName}`)
		Subscription.findOne({'user.screen_name': screenName}, function(err, user){
			if (err) reject(err);
			console.log( user ? 'user is already subscribed to' : 'user is not subscribed to');
			resolve(user)
		});
	});
};




function subscribeToUser(screenName){
	let response = {};
	return new Promise(function(resolve, reject){
		getSubscribedUser(screenName) // search for user in subscriptions 
		.then(function(subscribedUser){
			if (subscribedUser){ // user already subscribed. no more to do
				resolve({
					previouslySubscribed: true
				});
			} else { // search for user on Twitter
				getUserFromScreenName(screenName)
				.then(function(user){ 
					// save user to subscriptions
					var newSubscription = new Subscription({user: user});
					newSubscription.save(function(err, user){
						if (err) reject(err);
						resolve({
							user: user
						});
					});
				})
				.catch(function(err){
					reject(err);
				});
			}
		}).catch(function(err){
			reject(err);
		});
	});
};



