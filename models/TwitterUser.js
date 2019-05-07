var mongoose = require('mongoose');

//Define a schema 
var Schema = mongoose.Schema;

var TwitterUserSchema = new Schema({
	id_str: {
		type: String,
		unique: true,
		required: true
	},
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

});

// Compile model from schema
var TwitterUserModel = mongoose.model('TwitterUser', TwitterUserSchema);


module.exports = TwitterUserModel;