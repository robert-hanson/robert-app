import React from 'react';

export class NasaEarthImage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false
        };

        this.handleOnLoad = this.handleOnLoad.bind(this);
    }


    handleOnLoad(){
        this.setState({isLoaded: true})
        if(this.props.onImageLoad){
            this.props.onImageLoad(); //parent callback
        }
    }

    render(){
        return (
            <div className='text-center'>
                {this.state.isLoaded || <span className="spinner-border spinner-border-sm"></span>}
                <img 
                    className="border"
                    style={{height: '450px', width: '450px'}}
                    src={this.props.data.url} 
                    alt={this.props.alt} 
                    onLoad={this.handleOnLoad}
                />
            </div>
        );

    }
}
