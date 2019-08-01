import React from 'react'

import {NasaOrbitalData} from '../NasaOrbitalData'
import {NasaNeoLookupSearchControls} from '../NasaNeoLookupSearchControls'

import { NasaNeoFeedSearchControls } from '../NasaNeoFeedSearchControls';
import { Neo } from './Neo';

export class NeoLookupSearch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            result: null
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch = async(id) => {
        // event.preventDefault();
        let url = `/nasa/asteroids/lookup/${id}`;
        const response = await fetch(url);
        const body = await response.json();
    
        // client side exception handling
        if (response.status !== 200) {
          throw Error(body.message); 
        }

        this.setState({result: body});
    };


    render(){
        return(
            <div id='NeoLookupSearchPage'>
                {/* <h2>Asteroids</h2> */}
                <NasaNeoLookupSearchControls onSearch={this.handleSearch} />
                <div className='row'>
                    <Neo neo={this.state.result}/>
                </div>
            </div>
        );
    }
}