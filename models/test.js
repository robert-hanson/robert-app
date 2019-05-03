var mongoose = require('mongoose');

//Define a schema 
var Schema = mongoose.Schema;

var TestModelSchema = new Schema({
	field1: String,
	field2: String,
	field3: String
});

// Compile model from schema
var TestModel = mongoose.model('TestModel', TestModelSchema);


module.exports = TestModel;