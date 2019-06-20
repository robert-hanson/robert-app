import React from 'react';

export class NasaEarthImageSearch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lat: 0,             // Latitude
            lon: 0,             // Longitude
            dim: 0.025,         // width and height of image in degrees
            date: null,         // date of image; if not supplied, then the most recent image (i.e., closest to today) is used
            cloud_score: false  // calculate the percentage of the image covered by clouds
        };
    }

    render(){
        return(

        );
    }
}