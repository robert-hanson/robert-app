import React from 'react';

export class NasaEarthImage extends React.Component {
    
    render(){
        return <img src={this.props.data.url} alt={"specified region on earth from space"} onLoad={this.props.onLoad}  />
    }
}