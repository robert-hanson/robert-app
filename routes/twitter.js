var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var config = require('../config.js');
var T = new Twitter(config.twitterConfig);
//twitter archiving
var fs = require('fs');
// databases
var Tweet = require('../models/Tweet');
var TwitterUser = require('../models/TwitterUser');



/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('twitter', {twitterData: {}});
});


router.get('/subscriptions', function(req, res, next) {
	var subscriptions = config.twitterSubscriptions; 
	res.render("_tweetSubscriptions", {subscriptions: subscriptions});
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
	T.get('search/tweets', params, function(err, data, response) {
		console.log('do we get inside twitter logic?');
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
	    console.log('toArchive val: ' + req.body.toArchive);
	    console.log('archive val: ' + req.body.archive);
	    console.log('req.body: ' + JSON.stringify(req.body));
	    if(req.body.toArchive)
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
		    			console.log('Formatting tweets....');
	    				for (let i = 0; i < data.statuses.length; i++)
		    			{
		    				formattedTweets[i] = formatTweet(data.statuses[i], newUser);
		    			}

		    			console.log('archving tweets....');
		    			// save multiple documents to the collection referenced by Book Model
					    Tweet.insertMany(formattedTweets, function (err, docs) {
					      if (err){ 
					          return console.error(err);
					      } else {
					        console.log("Multiple documents inserted to Tweets");
				  			res.render('_tweetSearchResults', {twitterData: outData});
					      }
				    	});
	    			}
	    			else
	    			{
	    				console.log('user not found. adding to database....')
	    				var newTwitterUser = new TwitterUser(data.statuses[0].user);
	    				newTwitterUser.save(function(err, newUser){
	    					if(err)
	    					{
	    						console.error(err);
	    					}

	    					console.log('user saved....formatting tweet...');
	    					for (let i = 0; i < data.statuses.length; i++)
			    			{
			    				formattedTweets[i] = formatTweet(data.statuses[i], newUser);
			    			}

		    				console.log('archving tweets....');
			    			// save multiple documents to the collection referenced by Book Model
						    Tweet.insertMany(formattedTweets, function (err, docs) {
						      if (err){ 
						          return console.error(err);
						      } else {
						        console.log("Multiple documents inserted to Tweets");
					  			res.render('_tweetSearchResults', {twitterData: outData});
						      }
						    });


	    				});
	    			}

	    		});
	    	} else {
	    		console.log('rendering without saving...');
			  	res.render('_tweetSearchResults', {twitterData: outData});
	    	}
	    }
	    else {
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







		    	      // Try to Favorite the selected Tweet
	      // T.post('favorites/create', id, function(err, response){
	      //   // If the favorite fails, log the error message
	      //   if(err){
	      //     console.log(err[0].message);
	      //   }
	      //   // If the favorite is successful, log the url of the tweet
	      //   else{
	      //     let username = response.user.screen_name;
	      //     let tweetId = response.id_str;
	      //   }
	      // });
