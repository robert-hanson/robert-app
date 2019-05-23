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
	consumer_key: process.env.API_TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.API_TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.API_TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.API_TWITTER_ACCESS_TOKEN_SECRET
};

// list of twitter accounts to subscribe to 
exports.twitterSubscriptions = process.env.TWITTER_SUBSCRIPTIONS || [];

exports.db = {
	connectionString: process.env.DB_CONNECTION_STRING
};


exports.subscriptionsSyncInterval = process.env.SUBSCRIPTIONS_SYNC_INTERVAL;


exports.staticDirPath = process.env.STATIC_DIR_PATH;