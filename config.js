// config.js

// Set the current environment to true in the env object
var currentEnv = process.env.NODE_ENV || 'development';

exports.env = {
	production: false,
	staging: false,
	test: false,
	development: false
};  
exports.env[currentEnv] = true;



exports.twitterConfig = {
	consumer_key: '6C49xRHjC9A9IdGIP3vxYryaN',
	consumer_secret: 'ZR3OGG5NWYHOo8Vn1sGJ5LraIy8C2CWYlvZsi59cMH315GEqhP',
	access_token_key: '190506061-KhRwcIpo9Q8TiNJsNpuO6PD27s4iTyk7JSqgTMys',
	access_token_secret: '2Vnzc4osLVw0XeVKYbrN734Xqhh7h5WIVy3kp74zUpbTC'
};

// list of twitter accounts to subscribe to 
exports.twitterSubscriptions = process.env.TWITTER_SUBSCRIPTIONS || [];

exports.db = {
	connectionString: "mongodb+srv://dbUser:TGh340tyy5V9@cluster0-jsmxc.mongodb.net/app_db?retryWrites=true"
};