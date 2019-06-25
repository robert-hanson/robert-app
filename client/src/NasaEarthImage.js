import React from 'react';

export class NasaEarthImage extends React.Component {
    
    render(){
        let cloudScoreJsx;
        if (!isNaN(this.props.data.cloud_score)){
            cloudScoreJsx = <p>Cloud score of {this.props.data.cloud_score}</p>;
        }
        return (
            <div>
                {cloudScoreJsx}
                <img 
                   src={this.props.data.url} 
                   alt={"specified region on earth from space"} 
                   onLoad={this.props.onLoad}  
               />
            </div>
        );
    }
}