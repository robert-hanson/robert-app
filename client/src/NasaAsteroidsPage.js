import React from 'react'

import {NasaOrbitalData} from './NasaOrbitalData'
// import {NasaAsteroidDetails} from './NasaAsteroidDetails'

import { NasaAsteroidsSearchbar } from './NasaAsteroidsSearchbar';

export class NasaAsteroidsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            start_date: null,
            end_date: null,
            results: null,
            selectedAsteroid: null,
            detailed: true
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleAsteroidSelection = this.handleAsteroidSelection.bind(this);
        this.handleDetailedChange = this.handleDetailedChange.bind(this);
    }

    handleStartDateChange(date){
        this.setState({
            start_date: date
        });
    }

    handleEndDateChange(date){
        this.setState({
            end_date: date
        });
    }

    handleDetailedChange(event){
        this.setState({
            detailed: event.target.val
        });
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
            <div className='container'>
                {/* <h2>Asteroids</h2> */}
                <p>Search for asteroids</p>
                <NasaAsteroidsSearchbar onSearch={this.handleSearch} />
                {/* <form className='form-inline'>
                    <div className='form-group mr-2'>
                        <label for="start" className="my-auto mr-sm-2">Start:</label>
                        <DatePicker
                                selected={this.state.start_date}
                                onChange={this.handleStartDateChange}
                        />
                    </div>
                    <div className='form-group mr-2'>
                        <label for="end" className="my-auto mr-sm-2">End:</label>
                        <DatePicker
                                selected={this.state.end_date}
                                onChange={this.handleEndDateChange}
                        />
                    </div>
                    <div className="form-check mr-2">
                        <label className="form-check-label mr-sm-2">
                        <input  className="form-check-input" 
                                    type="checkbox" 
                                    onChange={this.handleDetailedChange} 
                                    defaultChecked={this.state.detailed}
                            /> Detailed
                        </label>
                    </div>
                    <button type="submit" className="btn btn-sm btn-primary my-auto" onClick={this.handleSearch}>Search</button>
                </form> */}
                <hr/>
                {/* results */}
                <div className='row'>
                    <div className='col-md-4'>
                        {this.state.results}
                    </div>
                    <div className='col-md-8'>
                        {this.state.selectedAsteroid && this.renderAsterioidInfo(this.state.selectedAsteroid)}
                    </div>
                </div>
            </div>
        );
    }

    renderAsterioidInfo(asteroidInfo){
        // const diameterUnits = ['kilometers', 'meters', 'miles', 'feet'];
        const estimatedDiameterInfo = asteroidInfo.estimated_diameter;

        const diameterInKilometers = `${estimatedDiameterInfo.kilometers.estimated_diameter_min} - ${estimatedDiameterInfo.kilometers.estimated_diameter_max}`;
        const diameterInMeters = `${estimatedDiameterInfo.meters.estimated_diameter_min} - ${estimatedDiameterInfo.meters.estimated_diameter_max}`;
        const diameterInMiles = `${estimatedDiameterInfo.miles.estimated_diameter_min} - ${estimatedDiameterInfo.miles.estimated_diameter_max}`;
        const diameterInFeet = `${estimatedDiameterInfo.feet.estimated_diameter_min} - ${estimatedDiameterInfo.feet.estimated_diameter_max}`;


        return (
            <div>
                <h3 className='text-center'>{asteroidInfo.name}</h3>
                {asteroidInfo.is_potentially_hazardous_asteroid &&  <div className="alert alert-danger" role="alert">
                                                                        POTENTIALLY HAZARDOUS
                                                                    </div>
                }
                <div className='row'>
                    <div className='col-sm-6'>
                        <dl>
                            <dt>Id</dt>
                            <dd>{asteroidInfo.id}</dd>

                            <dt>Neoreference Id</dt>
                            <dd>{asteroidInfo.neo_reference_id}</dd>

                            <dt>Absolute Magnitude (h)</dt>
                            <dd>{asteroidInfo.absolute_magnitude_h}</dd>
                            
                            <dt>Sentry Object</dt>
                            <dd>{asteroidInfo.is_sentry_object.toString()}</dd>
                            
                            <dt>Oribiting body</dt>
                            <dd>{asteroidInfo.close_approach_data[0].orbiting_body}</dd>
                        </dl>
                        <a href={asteroidInfo.nasa_jpl_url} target='_blank'>View Jet Propulsion Lab</a>
                    </div>
                    <div className='col-sm-6'>
                        <dl>
                            <dt>Estimated Diameter</dt>
                            <dd>{diameterInKilometers} (km)</dd>
                            <dd>{diameterInMeters} (m)</dd>
                            <dd>{diameterInMiles} (mi)</dd>
                            <dd>{diameterInFeet} (ft)</dd>
                            
                            <dt>Relative velocity</dt>
                            <dd>{asteroidInfo.close_approach_data[0].relative_velocity.kilometers_per_second}(km/s)</dd>
                            <dd>{asteroidInfo.close_approach_data[0].relative_velocity.kilometers_per_hour}(km/h)</dd>
                            <dd>{asteroidInfo.close_approach_data[0].relative_velocity.miles_per_hour}(mph)</dd>
                            
                            <dt>Miss Distance</dt>
                            <dd>{asteroidInfo.close_approach_data[0].miss_distance.astronomical}(astronomical)</dd>
                            <dd>{asteroidInfo.close_approach_data[0].miss_distance.lunar}(lunar)</dd>
                            <dd>{asteroidInfo.close_approach_data[0].miss_distance.kilometers}(km)</dd>
                            <dd>{asteroidInfo.close_approach_data[0].miss_distance.miles}(miles)</dd>
                        </dl>
                    </div>
                </div>
                <div className='row'>
                    <NasaOrbitalData data={asteroidInfo.orbital_data} />
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