var mongoose = require('mongoose');

//Define a schema 
var Schema = mongoose.Schema;

var NasaApodSchema = new Schema({
	date: String,
	explanation: String,
	hdurl: String,
	media_type: String,
	service_version: String,
	title: String,
    url: String
});

// Compile model from schema
var NasaApodModel = mongoose.model('NasaApod', NasaApodSchema);


module.exports = NasaApodModel;