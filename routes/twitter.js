var express = require('express');
var router = express.Router();
var config = require('../config.js');
var Twitter = require('twitter')(config.twitterConfig);

// databases
var Tweet = require('../models/Tweet');
var TwitterUser = require('../models/TwitterUser');
var Subscription = require('../models/Subscription');



/**********************************************************************/
//					controller routes/actions
/**********************************************************************/


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
router.post('/users/:userName/tweets/archive', function(req, res, next){
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
		console.error(err);
		res.json(err);
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


router.post('/subscriptions/user', async(req,res) => {
	try {
		const response = await subscribeToUser(req.body.screen_name);
		console.log(JSON.stringify(response));

		res.json(response);
	}
	catch(err) {
		console.error(err);
		res.json({
			error: err
		});
	}
});

router.delete('/subscriptions/user/:userName', function(req,res){
	unsubscribeFromUser(req.params.userName)
	.then(function(responseArray){
		res.json(responseArray);
	})
	.catch(function(errorArray){
		console.error(errorArray);
		res.json(error);
	});
});


router.get('/subscriptions/user/:userName/isInSync',async(req,res) => {
	try{
		const isInSync = await isUserInSyncAsync(req.params.userName);
		res.json({isInSync: isInSync});
	} catch(err){
		res.json({error: err});
	}
});

module.exports = router;



/**********************************************************************/
//					Helper/service methods
/**********************************************************************/

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


async function subscribeToUser(screenName){
	let response = {};
	// first get user object from twitter api (mongoose search is case sensitive so we need the exact username handle)
	const user = await getUserFromScreenName(screenName);
	const subscribedUser = await getSubscribedUser(user.screen_name);
	if (subscribedUser) {
		response = {
			user: user,
			previouslySubscribed: true
		};
		console.log('response: ' + response);
		return response;
	}else {
		// save user to subscriptions
		var newSubscription = new Subscription({user: user});
		newSubscription.save(function(err, newSub){
			response = {
				user: user,
				previouslySubscribed: false
			};
			console.log('response: ' + JSON.stringify(response));
			return response;
		});
	}
};





function unsubscribeFromUser(screenName){
	let response = {};
	return new Promise(function(resolve, reject){
		Subscription.deleteOne({ "user.screen_name": screenName }, function (err) {
			if (err) reject(err);
			  // deleted at most one subscription
			  resolve([]); 
			});
	});
}


async function isUserInSyncAsync(screenName){
	const maxId = await getTweetMaxIdFromUserNameAsync(screenName);
	const unsyncedTweets = await getTweetsFromUserNameAsync(screenName, maxId); // get tweets up 
	return unsyncedTweets.length === 0;
};