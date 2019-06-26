import React from 'react';
import {NasaEarthImage} from './NasaEarthImage';
import { NasaEarthAssets } from './NasaEarthAssets';

export class NasaEarthImageSearch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lat: 0,             // Latitude
            lon: 0,             // Longitude
            dim: 0.025,         // width and height of image in degrees
            date: null,         // date of image; if not supplied, then the most recent image (i.e., closest to today) is used
            cloud_score: false,  // calculate the percentage of the image covered by clouds
            searchResult: null, 
            isSearching: false,
            assetsSection: null
        };

        this.handleLatValueChange = this.handleLatValueChange.bind(this);
        this.handleLonValueChange = this.handleLonValueChange.bind(this);
        this.handleCloudScoreChange = this.handleCloudScoreChange.bind(this);
        this.handleImageSearch = this.handleImageSearch.bind(this);
        // this.handleImageLoaded = this.handleImageLoaded.bind(this);
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

    handleCloudScoreChange() {
        this.setState({
            cloud_score: !this.state.cloud_score //toggle
        });
    }

    handleImageSearch = async() => {
        this.setState({
            isSearching: true
        });

        this.setState({assetsSection: <NasaEarthAssets lat={this.state.lat} lon={this.state.lon}/>});

        let url = `/nasa/earth/imagery?lat=${this.state.lat}&lon=${this.state.lon}&cloud_score=${this.state.cloud_score}`;
        const response = await fetch(url);
        const body = await response.json();
    
        // client side exception handling
        if (response.status !== 200) {
          throw Error(body.message); 
        }

        // 
        this.setState({
            isSearching: false
        });
    }




    // handleImageLoaded(){
    //     this.setState({
    //         isSearching: false,
    //         assetsSection: <NasaEarthAssets lat={this.state.lat} lon={this.state.lon}/>
    //     });
        
    // }

    render(){
        return(
            <div>
                {/* <h2>Earth</h2> */}
                <div className="row">
                    <div className='col-md-6'>
                        <p>Search Landsat 8 images of Earth for the supplied location and date</p>
                        <div className='row'>
                            <div className="col-md-4 form-group">
                                <label htmlFor="lat">Lat:</label>
                                <input type="number" className="form-control" id="lat" max="90" min="-90" onChange={this.handleLatValueChange} />
                            </div>
                            <div className="col-md-4 form-group">
                                <label htmlFor="lon">Lon:</label>
                                <input type="number" className="form-control" id="lon" onChange={this.handleLonValueChange} />
                            </div>
                        </div>
                        <div className="form-group form-check">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" onChange={this.handleCloudScoreChange}/> Include Cloud Score
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.handleImageSearch} disabled={this.state.isSearching}>Find Image</button>
                    
                    </div>
                    <div className='col-md-6'>
                        {this.state.assetsSection}
                    </div>
                </div>
            </div>

        );
    }
}



