import React from 'react';

export class NasaApodPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            apodImage: {
                url: '#',
                title: "",
                explanation: ""
            }
        };
        this.loadImage = this.loadImage.bind(this);
    }

    componentDidMount = async() => {
        await this.loadImage();
    }


    loadImage = async() => {
        debugger;
        try {
            const url = '/nasa/apod';
            const res = await fetch(url);
            if (!res.ok){
                throw Error(res.statusText);
            }
            var data = await res.json();
            this.setState({apodImage: data});
        } catch(e){
            console.error(e);
        }
    }

    render(){ 
        debugger;
        return (
            <div>
                <div className='offset-md-2 col-md-8'>
                    {/* {this.props.showTitle && <h3 class='text-center'>{this.state.apodImage.title}</h3>} */}
                    <h3 className='text-center'>{this.state.apodImage.title}</h3>
                    <img className='img-fluid' src={this.state.apodImage.hdurl} alt={this.state.apodImage.title} />
                </div>
                <p className="pt-3 pb-5">{this.state.apodImage.explanation}</p>
            </div>
        )
    }
}