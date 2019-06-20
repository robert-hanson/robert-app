const config = require('../config.js');
const axios = require('axios');
const Logger = require('../Logger.js');
const NasaApod = require('../models/NasaApod');

const NASA_API_KEY = config.nasaApiKey;


exports.getAstronomyPictureOfTheDay = async() => {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
    const response = await axios.get(url);
    return response.data;
};

exports.saveNasaApod = async(apod) => {
    Logger.log('attempting to save NASA APOD...');
    const apodAlreadyExists = await doesNasaApodExist(apod);
    if (!apodAlreadyExists)
    {
        Logger.log('saving new APOD..');
        return await NasaApod.create(apod);
    } else {
        Logger.log('APOD already exists, nothing saved.');
        return apod;
    }
};


exports.getEarthImage = async(lat, lon, dim, date, cloud_score) => {
    // base url (lat/lon required)
    Logger.log('fetching earth image...');
    let url = `https://api.nasa.gov/planetary/earth/imagery/?lat=${lat}&lon=${lon}&api_key=${NASA_API_KEY}`;
    if (dim) url += `&dim=${dim}`;
    if (date) url += `&date=${date}`;
    if (cloud_score) url += `&cloud_score=${cloud_score}`;
    const response = await axios.get(url);
    return response.data;
};

const doesNasaApodExist = async(apod) => {
    const resultSet = await NasaApod.find(apod);
    return resultSet.length > 0;
};


