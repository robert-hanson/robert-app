import React from 'react';

export class NasaApodImage extends React.Component {
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
        return (
            <img className='img-fluid' src={this.state.data.hdurl} alt={this.state.data.title} />
        )
    }
}