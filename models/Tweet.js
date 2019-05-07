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
	source: String,
	truncated: Boolean,
	in_reply_to_status_id_str: String,
	in_reply_to_user_id_str: String,
	in_reply_to_screen_name: String,
	// user stuff,
	user: { 
		type: Schema.Types.ObjectId, 
		ref: 'TwitterUser' 
	},
	quoted_status_id_str: String,
	is_quote_status: String

});

// Compile model from schema
var TweetModel = mongoose.model('Tweet', TweetSchema);


module.exports = TweetModel;