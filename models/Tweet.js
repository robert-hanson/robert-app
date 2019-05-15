var mongoose = require('mongoose');

//Define a schema 
var Schema = mongoose.Schema;

var TweetSchema = new Schema({
	created_at: String,
	id_str: { 
		type: String, 
		unique: true,
		required: true 
	},
	text: String,
	full_text: String,
	source: String,
	truncated: Boolean,
	in_reply_to_status_id_str: String,
	in_reply_to_user_id_str: String,
	in_reply_to_screen_name: String,
	// user stuff,
	user: { 
			id_str: String,
			name: String,
			screen_name: String,
			location: String,
			url: String,
			description: String,
			protected: Boolean,
			verified: Boolean,
			created_at: String,
			profile_banner_url: String,
			profile_image_url_https: String

	},
	coordinates: {
		id: String,
		url: String,
		place_type: String, 
		name: String,
		full_name: String, 
		country_code: String,
		country: String, 
		// bouding_box: {
		// 	coordinates: 
		// 	type: String
		// }
	},
	quoted_status_id_str: String,
	is_quote_status: Boolean,
	//quoted_status: tweet
	//retweeted status: tweet
	quote_count: Number,
	reply_count: Number,
	retweet_count: Number,
	favorite_count: Number,
	//entitites: entity 
	possibly_sensitive: Boolean,
	// filter_leveL: String
	lang: String
});

// Compile model from schema
var TweetModel = mongoose.model('Tweet', TweetSchema);


module.exports = TweetModel;