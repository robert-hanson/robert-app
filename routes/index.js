var express = require('express');
var router = express.Router();

/* GET home page. */
//production mode
if(process.env.NODE_ENV === 'production') {
  //
  router.get('/', (req, res) => {
    res.sendfile(path.join(__dirname = 'client/build/index.html'));
  })
}
//build mode
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})


module.exports = router;
