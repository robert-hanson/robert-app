var express = require('express');
var router = express.Router();

var Nasa = require('../managers/Nasa.js');


//build mode
router.get('/apod', async(req, res) => {
    try{
        const picOfTheDay = await Nasa.getAstronomyPictureOfTheDay();
        res.send(picOfTheDay);
    } catch(e){
        console.error(e);
        res.send(e);
    }
})


module.exports = router;
