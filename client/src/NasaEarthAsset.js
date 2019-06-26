import React from 'react';
import {NasaEarthImage} from './NasaEarthImage';

export class NasaEarthAsset extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            imageLoaded: false
        };

        this.handleImageLoad = this.handleImageLoad.bind(this);
    }

    handleImageLoad(){
        this.setState({imageLoaded: true});
        // execute callback if provided
        if(this.props.onLoad){ 
            this.props.onLoad();
        }
    }

    render(){
        return(
            <div className="text-center">
                {this.state.imageLoaded && 
                    <h4>{new Date(this.props.asset.date).toLocaleDateString("en-US")}</h4>
                }
                <NasaEarthImage 
                    lat={this.props.lat} 
                    lon={this.props.lon}
                    date={this.props.asset.date}
                    onImageLoad={this.handleImageLoad}
                    alt={this.props.asset.id}
                />
            </div>
        );
    }
}