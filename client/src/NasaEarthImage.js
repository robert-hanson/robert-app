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
                {this.state.isLoaded || <span class="spinner-border spinner-border-sm"></span>}
                <img 
                    className="border"
                    style={{height: '450px', width: '450px'}}
                    src={this.props.data.url} 
                    alt={this.props.alt} 
                    onLoad={this.handleOnLoad}
                />
            </div>
        );


        // let cloudScoreJsx;
        // if (!isNaN(this.props.data.cloud_score)){
        //     cloudScoreJsx = <p>Cloud score of {this.props.data.cloud_score}</p>;
        // }
        // return (
        //     <div>
        //         {cloudScoreJsx}

        //     </div>
        // );
    }
}


// constructor(props){
//     super(props);
//     this.state = {
//         image: null,
//         isLoaded: false
//     };

//     this.loadImage = this.loadImage.bind(this);
//     this.handleOnLoad = this.handleOnLoad.bind(this);
// }


// componentDidMount = async() => {
//     await this.loadImage();
// }


// loadImage = async() => {
//     let url = `/nasa/earth/imagery?lat=${this.props.lat}&lon=${this.props.lon}`;
//     if (this.props.cloud_score){
//         url = url + `&cloud_score=${this.props.cloud_score}`;
//     }
//     const response = await fetch(url);
//     const body = await response.json();

//     // client side exception handling
//     if (response.status !== 200) {
//       throw Error(body.message); 
//     }

//     this.setState({image: body});
// }

// handleOnLoad(){
//     this.setState({isLoaded: true})
//     if(this.props.onImageLoad){
//         this.props.onImageLoad(); //callback
//     }
// }

// render(){
//     return (
//         this.state.image &&
//         <div>
//             <span hidden={this.state.isLoaded} class="spinner-border spinner-border-sm"></span>
//             <img 
//                 className="border"
//                 src={this.state.image.url} 
//                 alt={this.props.alt} 
//                 onLoad={this.handleOnLoad}  
//             />
//         </div>
//     );