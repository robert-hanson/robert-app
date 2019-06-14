const config = require('../config.js');
const axios = require('axios');


exports.getAstronomyPictureOfTheDay = async() => {
    const apiKey = config.nasaApiKey;
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    return await axios.get(url);
};

