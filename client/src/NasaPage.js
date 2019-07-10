import React from 'react';
import {NasaApodPage} from './NasaApodPage';
import {NasaNavbar} from './NasaNavbar';
import {NasaEarthImageSearch} from './NasaEarthImageSearch';

export class NasaPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pageToDisplay: <NasaApodPage/>
        };
        this.handleNavbarSelectionChange = this.handleNavbarSelectionChange.bind(this);
    }

    handleNavbarSelectionChange(event){
        const pageToDisplay = event.target.id;
        if (pageToDisplay === 'APOD'){
            this.setState({pageToDisplay: <NasaApodPage />});
        } else if (pageToDisplay === 'Earth'){
            this.setState({pageToDisplay: <NasaEarthImageSearch />});
        }
    }

    render(){
        const navbarPages = ['APOD', 'Earth']; // navbar pages to show
        return (
            <div>
                <NasaNavbar items={navbarPages} onSelectionChange={this.handleNavbarSelectionChange}/>
                <div className=''>
                    {this.state.pageToDisplay}
                </div>
            </div>
        );
    }
}