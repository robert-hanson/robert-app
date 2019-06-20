import React from 'react';
import {NasaEarthImage} from './NasaEarthImage';

export class NasaEarthImageSearch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lat: 0,             // Latitude
            lon: 0,             // Longitude
            dim: 0.025,         // width and height of image in degrees
            date: null,         // date of image; if not supplied, then the most recent image (i.e., closest to today) is used
            cloud_score: false,  // calculate the percentage of the image covered by clouds
            resultImage: null
        };

        this.handleLatValueChange = this.handleLatValueChange.bind(this);
        this.handleLonValueChange = this.handleLonValueChange.bind(this);
        this.handleImageSearch = this.handleImageSearch.bind(this);
    }

    handleLatValueChange(event){
        this.setState({
            lat: event.target.value
        });
    }

    handleLonValueChange(event){
        this.setState({
            lon: event.target.value
        });
    }

    handleImageSearch = async() => {
        let url = `/nasa/earth/imagery?lat=${this.state.lat}&long=${this.state.lon}`;
        const response = await fetch(url);
        const body = await response.json();
    
        if (response.status !== 200) {
          throw Error(body.message); 
        }
        this.setState({resultImage: body});
    }

    render(){
        return(
            <div>
                {/* <h2>Earth</h2> */}
                <p>Search Landsat 8 images of Earth for the supplied location and date</p>
                <div className='col-md-6'>
                    <div className="form-group">
                        <label for="lat">Lat:</label>
                        <input type="text" className="form-control" id="lat" />
                    </div>
                    <div className="form-group">
                        <label for="lon">Lon:</label>
                        <input type="text" className="form-control" id="lon" />
                    </div>
                    <div className="form-group form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox"/> Include Cloud Score
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.handleImageSearch}>Find Image</button>
                </div>
                <div className='col-md-6'>
                    {this.state.resultImage != null && <NasaEarthImage data={this.state.resultImage}/>}
                </div>
            </div>

        );
    }
}



