import React from 'react';

export class NasaApod extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: {
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
            this.setState({data: data});
        } catch(e){
            console.error(e);
        }
    }

    render(){ 
        debugger;
        return (
            <div className='offset-md-2 col-md-8'>
                {this.props.showTitle && <h3 class='text-center'>{this.state.data.title}</h3>}
                <img className='img-fluid' src={this.state.data.hdurl} alt={this.state.data.title} />
                <p>{this.state.data.explanation}</p>
            </div>
        )
    }
}