// REACT ROUTER

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('routing to react...');
  res.render('react', {title: 'React' });
});

router.get('/backend-test', (req, res) => {
	console.log('backend-test was hit!!');
	res.send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});



module.exports = router;
