var express = require('express');
var router = express.Router();

var Nasa = require('../managers/Nasa.js');
const Logger = require('../Logger.js');


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
})

// router.post('/apod', async(req, res) =>{
//     try{
//         const picOfTheDay = await Nasa.getAstronomyPictureOfTheDay();
//         const response = await Nasa.saveNasaApod(picOfTheDay);
//         res.send(response);
//     } catch(e){
//         console.error(e);
//         res.send(e);
//     }
// });

router.get('/earth/imagery', async(req,res) => {
    try {
        const image = await Nasa.getEarthImage(req.query.lat, req.query.lon, req.query.dim, req.query.date, req.query.cloud_score);
        res.send(image);
    } catch(e){
        console.error(e);
        Logger.log("there was an error :(");
        res.send(e);
    }
});

module.exports = router;
