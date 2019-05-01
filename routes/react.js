// REACT ROUTER

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('routing to react...');
  res.render('react', {title: 'React' });
});



module.exports = router;
