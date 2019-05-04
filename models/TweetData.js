var mongoose = require('mongoose');

//Define a schema 
var Schema = mongoose.Schema;

var TweetDataSchema = new Schema({
	created_at: String,
	id_str: String,
	text: String,
	source: String,
	truncated: Boolean,
	in_reply_to_status_id_str: String,
	in_reply_to_user_id_str: String,
	in_reply_to_screen_name: String,
	// user stuff,
	// coordinate stuff,
	// place stuff,
	quoted_status_id_str: String,
	is_quote_status: String

});

// Compile model from schema
var TweetDataModel = mongoose.model('TweetData', TestModelSchema);


module.exports = TweetDataModel;