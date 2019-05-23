var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('do we get here?');
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});



module.exports = router;
