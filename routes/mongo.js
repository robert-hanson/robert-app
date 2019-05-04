var express = require('express');
var router = express.Router();

// database
var TestModel = require('../models/test');

/* GET mongo page. */
router.get('/', function(req, res, next) {
  res.render('mongo', { });
});

router.get('/TestModel/getAll', function(req, res, next) {
	var results = TestModel.find(function(err, data){
		// fetched!
		res.send(data);
	});
});


router.post('/TestModel/add', function(req, res, next) {

	var field1 = req.body.field1;
	var field2 = req.body.field2;
	var field3 = req.body.field3;

	console.log('creating new test model record...');
	// add new record to collection/table
	TestModel.create({
			field1: field1,
			field2: field2,
			field3: field3
		}, function(err, newInstance){
			// saved!
			console.log('real error: ' + err);

			console.log('searching all test model records...');
			var results = TestModel.find().limit(100).exec(function(err, data){
			console.log('Error: ' + JSON.stringify(err));
	  		res.json(data);
		});
	});


});



module.exports = router;
