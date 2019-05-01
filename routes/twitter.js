var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var config = require('../config.js');
var T = new Twitter(config);

//twitter archiving
var fs = require('fs');
var jsonxml = require('jsontoxml');
const ARCHIVE_FILE = './archivedTweets.xml';


console.log('does twitter.js ever get loaded?'); //TODO 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.post('/', function(req, res, next) {
	console.log('please');
	// Set up your search parameters
	var params = {
	  q: req.body.search,
	  count: 100,
	  result_type: 'recent',
	  lang: 'en'
	}
	console.log('we made it to twitter route');
	var searchStr = req.body.search;
	// Initiate your search using the above paramaters
	T.get('search/tweets', params, function(err, data, response) {
	  // If there is no error, proceed
	  if(!err){
	  	var outData = []; // custom var to play around with and render
	  	writeTweetsToFile(data.statuses, ARCHIVE_FILE);

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
	    }
  			res.render('twitter', { twitterData: outData});

	  } else {
	    console.log(err);
	  }
	});


});
module.exports = router;

	function writeTweetsToFile(tweets, file)
	{
		// convert tweet from json to xml 
		var xml = jsonxml(tweets);

		fs.appendFile(file, xml, function (err) {
			if (err) throw err;
		 	console.log('Saved!');
		});
	}


	function writeTweetToFile(tweet, file)
	{
		// convert tweet from json to xml 
		var xml = jsonxml(tweet);

		fs.appendFile(file, xml, function (err) {
			if (err) throw err;
		 	console.log('Saved!');
		});
	}


