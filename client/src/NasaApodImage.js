import React from 'react';

export class NasaApodImage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            image: null
        };
        this.handleOnLoad = this.handleOnLoad.bind(this);
    }

    componentDidMount(){
        this.setState({
            isLoading: false,
            image: <img className='img-fluid' 
                        src={this.props.data.hdurl} 
                        alt={this.props.data.title} 
                        onLoad={this.handleOnLoad} 
                        onError={this.handleOnLoad} 
                    />
        });
    }

    handleOnLoad(){
        this.setState({
            isLoading: false
        })
    }

    render(){ 
        let spinnerJsx = <div className='text-center'>
                            <span class="spinner-border spinner-border-sm"/>
                         </div>;

        let imageJsx =  <div>
                            <div className='offset-md-2 col-md-8'>
                                {/* {this.props.showTitle && <h3 class='text-center'>{this.state.apodImage.title}</h3>} */}
                                <h3 className='text-center'>{this.props.data.title}</h3>
                                {/* <img className='img-fluid' src={this.state.apodImage.hdurl} alt={this.state.apodImage.title} /> */}
                                <img className='img-fluid' src={this.props.data.hdurl} alt={this.props.data.title} />
                            </div>
                            <p className="pt-3 pb-5">{this.props.data.explanation}</p>
                        </div>;

        return (
            <div>
                {/* Show spinner if loading */}
                {this.state.isLoading && spinnerJsx}
                {/* Show image if done loading */}
                {!this.state.isLoading && imageJsx}
            </div>
        )
    }
}