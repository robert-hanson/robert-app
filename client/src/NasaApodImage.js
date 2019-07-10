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

        // let imageJsx =  <div className='text-center offset-md-3 col-md-6'>
        //                         {/* {this.props.showTitle && <h3 class='text-center'>{this.state.apodImage.title}</h3>} */}
        //                         <h3 className='text-center'>{this.props.data.title}</h3>
        //                         {/* <img className='img-fluid' src={this.state.apodImage.hdurl} alt={this.state.apodImage.title} /> */}
        //                         <img className='img-fluid' src={this.props.data.hdurl} alt={this.props.data.title} />
        //                         <p className="pb-5 text-sm">
        //                             <small>
        //                                 {this.props.data.explanation}
        //                             </small>
        //                         </p>
        //                 </div>;


        let imageJsx =  <div  className='w-75 mx-auto'>
                            {/* IMAGE */}
                            <div className='row' style={{height: '80vh'}}>
                                <img className='img-fluid mh-100' src={this.props.data.hdurl} alt={this.props.data.title} />
                                <div className='col align-middle h-100' style={{overflowY: 'scroll'}}>
                                    <h6>{this.props.data.title}</h6>
                                    <p className="pb-5 text-sm">
                                        <small>
                                            {this.props.data.explanation}
                                        </small>
                                    </p>
                                </div>
                            </div>
                            {/* IMAGE TEXT */}
                        </div>;





        return (
            <div className='row'>
                {/* Show spinner if loading */}
                {this.state.isLoading && spinnerJsx}
                {/* Show image if done loading */}
                {!this.state.isLoading && imageJsx}
            </div>
        )
    }
}