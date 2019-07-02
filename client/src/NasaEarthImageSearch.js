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
            assetsSection: null
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

    handleDimValueChange(event){
        this.setState({
            dim: event.target.value
        });
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
        debugger;
        this.setState({imageToDisplay: null})
        await this.loadImage(asset);
    }

    loadImage = async(asset)=> {

        const date = this.formatDate(asset.date);
        // date must be in format YYYY-MM-DD
        let url = `/nasa/earth/imagery?lat=${this.state.lat}&lon=${this.state.lon}&cloud_score=${this.state.cloud_score}&date=${date}`;
        const response = await fetch(url);
        const body = await response.json();
    
        // client side exception handling
        if (response.status !== 200) {
          throw Error(body.message); 
        }

        this.setState({imageToDisplay: <NasaEarthImage data={body} alt={asset.id} />});
    }

    formatDate(date){
        return date.substring(0, date.indexOf('T'));
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
                    <button type="submit" className="btn btn-primary mb-2" onClick={this.handleImageSearch} disabled={this.state.isSearching}>Submit</button>
                </form>
                <hr/>





                {/* <h2 className='mt-2'>Earth</h2> */}
                <div className="row">
                    {/* <div className='col-md-6'>
                        <div className='row'>
                            <div className="col-md-4 form-group">
                                <label htmlFor="lat">Lat:</label>
                                <input 
                                    type="number" 
                                    className="form-control-sm" 
                                    id="lat" 
                                    // max="90" 
                                    // min="-90" 
                                    onChange={this.handleLatValueChange}
                                />
                            </div>
                            <div className="col-md-4 form-group">
                                <label htmlFor="lon">Lon:</label>
                                <input  
                                    type="number" 
                                    className="form-control-sm" 
                                    id="lon" 
                                    onChange={this.handleLonValueChange} 
                                />
                            </div>
                            <div className="col-md-4 form-group">
                                <label htmlFor="dim">Dim:</label>
                                <input 
                                    type="number" 
                                    className="form-control-sm" 
                                    id="dim" 
                                    onChange={this.handleDimValueChange} 
                                    value={this.state.dim}
                                />
                            </div>
                        </div>
                        <div className="form-group form-check">
                            <label className="form-check-label">
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    onChange={this.handleCloudScoreChange}
                                />
                                Include Cloud Score
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={this.handleImageSearch} disabled={this.state.isSearching}>Find Image</button>
                        {this.state.imageToDisplay}
                    </div> */}
                    <div className='col-md-6'>
                        {this.state.assetsSection}
                    </div>
                </div>
            </div>

        );
    }
}



