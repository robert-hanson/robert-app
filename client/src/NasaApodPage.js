import React from 'react';
import { NasaApodImage } from './NasaApodImage';

export class NasaApodPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            apods: [], 
            isLoading: false
        };
        this.loadImages = this.loadImages.bind(this);
    }

    componentDidMount = async() => {
        await this.loadImages();
    }


    loadImages = async() => {
        let apods = [];
        try {
            this.setState({
                isLoading: true
            });
            const url = '/nasa/apods';
            const res = await fetch(url);
            if (!res.ok){
                throw Error(res.statusText);
            }
            apods = await res.json();
        } catch(e){ 
            console.error(e);
        } finally {
            this.setState({
                isLoading: false,
                apods: apods
            });
        }
    }

    getCarouselIndicators(parentElementId){
        let indicators = [];
        const dataTargetId = `#${parentElementId}`;
        for(let i = 0; i < this.state.apods.length; i++){
            const isActive = i === this.state.apods.length -1;
            indicators[i] = <li 
                                data-target={dataTargetId} 
                                data-slide-to={i} 
                                className={isActive && "active"}
                            ></li>;
        }
        return indicators;
    }

    getCarouselItems(parentElementId){
        let items = [];
        for(let i=0; i < this.state.apods.length; i++){
            const isActive = i === this.state.apods.length - 1;
            const classNames = `carousel-item ${isActive ? 'active': ''}`;
            items[i] =  <div className={classNames}>
                            <NasaApodImage data={this.state.apods[i]} />
                        </div>
        }
        return items;
    }

    render(){ 
        const carouselId = 'apods';

        return (
            <div className='container-fluid'>
                <h4 className='text-center'>NASA's Astronomy Pictures of the Day</h4>
                <div id={carouselId} className="carousel slide w-90 pt-2" data-ride="carousel">

                    {/* <!-- Indicators --> */}
                    <ul className="carousel-indicators">
                        {this.getCarouselIndicators(carouselId)}
                    </ul>

                    {/* <!-- The slideshow --> */}
                    <div className="carousel-inner">
                        {this.getCarouselItems(carouselId)}
                    </div> 

                    {/* <!-- Left and right controls --> */}
                    <a className="carousel-control-prev" href="#apods" data-slide="prev">
                        <span className="carousel-control-prev-icon bg-dark"></span>
                    </a>
                    <a className="carousel-control-next" href="#apods" data-slide="next">
                        <span className="carousel-control-next-icon bg-dark"></span>
                    </a>

                </div>
            </div>
        )
    }
}