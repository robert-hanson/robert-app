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
            imageToDisplay: null, 
            isSearching: false,
            assetsSection: null,
            selectedAsset: null
        };

        this.handleLatValueChange = this.handleLatValueChange.bind(this);
        this.handleLonValueChange = this.handleLonValueChange.bind(this);
        this.handleDimValueChange = this.handleDimValueChange.bind(this);
        this.handleCloudScoreChange = this.handleCloudScoreChange.bind(this);
        this.handleImageSearch = this.handleImageSearch.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
        this.loadImage = this.loadImage.bind(this);
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

    handleDimValueChange = async(event) => {
        this.setState({
            dim: event.target.value
        }, this.loadImage);
        // reload image
        // await this.loadImage();
    }
    handleCloudScoreChange() {
        this.setState({
            cloud_score: !this.state.cloud_score //toggle
        });
    }

    handleImageSearch = async(event) => {
        debugger;
        event.preventDefault();
        this.setState({
            isSearching: true, 
            imageToDisplay: null
        });

        this.setState({assetsSection: <NasaEarthAssets 
                                        lat={this.state.lat} 
                                        lon={this.state.lon} 
                                        // dim={this.state.dim}
                                        onSelection={this.handleSelectionChange}
                                    />});


        // 
        this.setState({
            isSearching: false
        });
    }

    handleSelectionChange = async(asset)=>{
        this.setState({
            imageToDisplay: null, 
            selectedAsset: asset
        }, this.loadImage);
    }

    loadImage = async()=> {
        const date = this.formatDate(this.state.selectedAsset.date);
        // date must be in format YYYY-MM-DD
        let url = `/nasa/earth/imagery?lat=${this.state.lat}&lon=${this.state.lon}&cloud_score=${this.state.cloud_score}&date=${date}&dim=${this.state.dim}`;
        const response = await fetch(url);
        const body = await response.json();
    
        // client side exception handling
        if (response.status !== 200) {
          throw Error(body.message); 
        }

        this.setState({imageToDisplay: <NasaEarthImage data={body} alt={this.state.selectedAsset.id} />});
    }

    formatDate(date){
        return date.substring(0, date.indexOf('T'));
    }


    render(){
        return(
            <div className='container'>

                <p className='pt-2'>Search Landsat 8 images of Earth for the supplied location and date</p>
                <form className="form-inline">
                    <label for="lat" className="mr-sm-2">Lat:</label>
                    <input type="number" className="form-control mb-2 mr-sm-2" id="lat" onChange={this.handleLatValueChange}/>
                    <label for="lon" className="mr-sm-2">Lon:</label>
                    <input type="number" className="form-control mb-2 mr-sm-2" id="lon" onChange={this.handleLonValueChange} />
                    <div className="form-check mb-2 mr-sm-2">
                        <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" onChange={this.handleCloudScoreChange}/> Include Cloud Score
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary mb-2" onClick={this.handleImageSearch} disabled={this.state.isSearching}>Search</button>
                </form>
                <hr/>

                <div className="row" style={{height: '70vh'}}>

                    <div className='col-md-3 mh-100' style={{overflowY: 'scroll'}}>
                        {this.state.assetsSection}
                    </div>
                    <div className='mh-100 offset-md-1 col-md-8 '>
                        <div className='bg-dark'>
                            {this.state.imageToDisplay}
                        </div>
                        {this.state.imageToDisplay && 
                            <div>
                                <label htmlFor="dim">Dimension (degrees):</label>
                                <input 
                                    type="range" 
                                    className="form-control" 
                                    min='0'
                                    max='1'
                                    step='0.25'
                                    // step='0.005'
                                    id="dim" 
                                    // onClick={this.handleDimValueChange} 
                                    // onKeyUp={this.handleDimValueChange} 
                                    onChange={this.handleDimValueChange} 
                                    value={this.state.dim}
                                />
                                <span>{this.state.dim}</span>
                            </div>
                        }
                    </div>
                </div>
            </div>

        );
    }
}



