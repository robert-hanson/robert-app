var express = require('express');
var router = express.Router();
var Twitter = require('twitter');
var config = require('../config.js');
var T = new Twitter(config);



/* GET home page. */
router.post('/twitter', function(req, res, next) {
	console.log('please');
	// Set up your search parameters
	var params = {
	  q: '#nodejs',
	  count: 10,
	  result_type: 'recent',
	  lang: 'en'
	}
	console.log('we made it to twitter route');
	var searchStr = req.body.search;
	// Initiate your search using the above paramaters
	T.get('search/tweets', params, function(err, data, response) {
	  // If there is no error, proceed
	  if(!err){
	    // Loop through the returned tweets
	    for(let i = 0; i < data.statuses.length; i++){
	      // Get the tweet Id from the returned data
	      let id = { id: data.statuses[i].id_str }
	      // Try to Favorite the selected Tweet
	      T.post('favorites/create', id, function(err, response){
	        // If the favorite fails, log the error message
	        if(err){
	          console.log(err[0].message);
	        }
	        // If the favorite is successful, log the url of the tweet
	        else{
	          let username = response.user.screen_name;
	          let tweetId = response.id_str;
	          console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
	        }
	      });
	    }
	      res.render('twitter', { search: 'Express' });
	  } else {
	    console.log(err);
	  }
	});


});
module.exports = router;
