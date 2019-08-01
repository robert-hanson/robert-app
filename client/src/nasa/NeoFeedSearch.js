import React from 'react'

import {NasaOrbitalData} from '../NasaOrbitalData'
import {NasaNeoLookupSearchControls} from '../NasaNeoLookupSearchControls'

import { NasaNeoFeedSearchControls } from '../NasaNeoFeedSearchControls';
import { Neo } from './Neo';

export class NeoFeedSearch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            results: null,
            selectedAsteroid: null
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAsteroidSelection = this.handleAsteroidSelection.bind(this);
    }


    handleSearch = async(state) => {
        // event.preventDefault();
        // date must be in format YYYY-MM-DD
        const start = this.getFormattedDate(state.start_date);
        const end = this.getFormattedDate(state.end_date);
        let url = `/nasa/asteroids/feed?start_date=${start}&end_date=${end}&detailed=${state.detailed}`;
        const response = await fetch(url);
        const body = await response.json();
    
        // client side exception handling
        if (response.status !== 200) {
          throw Error(body.message); 
        }

        this.setState({results: this.formatResults(body)});
    };

    handleAsteroidSelection(asteroid){
        this.setState({selectedAsteroid: asteroid});
    }

    render(){
        return(
            <div id='NeoFeedSearchPage'>
                {/* <h2>Asteroids</h2> */}
                {/* <p>Search for asteroids</p> */}
                <NasaNeoFeedSearchControls onSearch={this.handleSearch} />
                {/* <hr/> */}
                {/* results */}
                <div className='row'>
                    <div className='col-md-4'>
                        {this.state.results}
                    </div>
                    <div className='col-md-8'>
                        {this.state.selectedAsteroid && <Neo neo={this.state.selectedAsteroid}/>}
                    </div>
                </div>
            </div>
        );
    }


    /* returns datestrings in format (YYYY-MM-DD) */
     getFormattedDate(date) {
        const year = date.getFullYear();
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = (date.getUTCDate()).toString().padStart(2, '0');
        // Logger.log(`Day: ${day}, Month: ${month}, Year:${year}`)
        const dateFormatted = `${year}-${month}-${day}`;
        return dateFormatted;
    }

    formatResults(resultsObj){
        // reformat nasa json results in a way more easy to work with jsx (ie handling the dynamic date string as a key)
        var formattedResults = [];
        for (var dateKey in resultsObj) {
            if (resultsObj.hasOwnProperty(dateKey)) {
                const asteroidsArray = resultsObj[dateKey];
                const formattedResultObj = {
                    date: dateKey,
                    asteroids: asteroidsArray
                };
                formattedResults.push(formattedResultObj)
            }
        }

        const jsx = formattedResults.map((result) => 
            <li key={result.date}>{result.date}
                {this.getAsteroidsJsx(result.asteroids)}
            </li> 
        );

        return <ul>{jsx}</ul>;
    }

    getAsteroidsJsx(asteroids){
        const innerJsx = asteroids.map(asteroid => 
            <li key={asteroid.id}>
                <button className='btn btn-link btn-sm' onClick={this.handleAsteroidSelection.bind(this, asteroid)}>{asteroid.name}</button>
            </li>
        );
        return <ul>{innerJsx}</ul>;
    }
}