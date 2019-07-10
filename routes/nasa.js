var express = require('express');
var router = express.Router();

var Nasa = require('../managers/Nasa.js');
const Logger = require('../Logger.js');


/******************** APOD ************************/
router.get('/apod', async(req, res) => {
    try{
        Logger.log('fetching NASA\'s Astrononmy Picture of the Day (APOD)');
        const picOfTheDay = await Nasa.getAstronomyPictureOfTheDay();
        await Nasa.saveNasaApod(picOfTheDay);
        res.send(picOfTheDay);
    } catch(e){
        console.error(e);
        res.send(e);
    }
});


router.get('/apods', async(req, res) => {
    try{
        const apods = await Nasa.getSavedNasaApods();
        res.send(apods);
    } catch(e){
        console.error(e);
        res.send(e);
    }
});

/******************** EARTH ************************/

router.get('/earth/imagery', async(req,res) => {
    try {
        const image = await Nasa.getEarthImage(req.query.lat, req.query.lon, req.query.dim, req.query.date, req.query.cloud_score);
        res.send(image);
    } catch(e){
        Logger.log("there was an error :(");
        console.error(JSON.stringify(e));
        let response = {error: e};
        res.send(response);
    }
});


router.get('/earth/assets', async(req,res) => {
    try {
        const assets = await Nasa.getLandsatAssets(req.query.lat, req.query.lon, req.query.begin, req.query.end);
        res.send(assets);
    } catch(e){
        Logger.log("there was an error :(");
        console.error('e: '  + JSON.stringify(e));
        let response = {error: e};
        res.send(response);
    }
});


/******************** Asteroids ************************/

router.get('/asteroids/feed', async(req,res) =>{
    try {
        const asteroids = await Nasa.getAsteroidsByFeed(req.query.start_date, req.query.end_date);
        res.send(asteroids);
    } catch(exception){
        Logger.log("there was an error :(");
        console.error('e: '  + JSON.stringify(exception));
        let response = {error: exception};
        res.send(response);
    }
});





module.exports = router;
