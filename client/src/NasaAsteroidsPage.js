import React from 'react'
import DatePicker from "react-datepicker";
// import {NasaAsteroidDetails} from './NasaAsteroidDetails'

import "react-datepicker/dist/react-datepicker.css";

export class NasaAsteroidsPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            start_date: null,
            end_date: null,
            results: null,
            selectedAsteroid: null
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.handleAsteroidSelection = this.handleAsteroidSelection.bind(this);
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

    handleSearch = async(event) => {
        debugger;
        event.preventDefault();
        // date must be in format YYYY-MM-DD
        const start = this.getFormattedDate(this.state.start_date);
        const end = this.getFormattedDate(this.state.end_date);
        let url = `/nasa/asteroids/feed?start_date=${start}&end_date=${end}`;
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
                <p>Search for assteroids</p>
                <form className='form-inline'>
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
                    <button type="submit" className="btn btn-sm btn-primary my-auto" onClick={this.handleSearch}>Search</button>
                </form>
                <hr/>
                {/* results */}
                <div className='row'>
                    <div className='col-md-6'>
                        {this.state.results}
                    </div>
                    <div className='col-md-6'>
                        {this.state.selectedAsteroid && this.renderAsterioidInfo(this.state.selectedAsteroid)}
                    </div>
                </div>
            </div>
        );
    }

    renderAsterioidInfo(asteroidInfo){
        // const diameterUnits = ['kilometers', 'meters', 'miles', 'feet'];
        const estimatedDiameterInfo = asteroidInfo.estimated_diameter;

        const diameterInKilometers = `(${estimatedDiameterInfo.kilometers.estimated_diameter_min}-${estimatedDiameterInfo.kilometers.estimated_diameter_max})`;
        const diameterInMeters = `(${estimatedDiameterInfo.meters.estimated_diameter_min}-${estimatedDiameterInfo.meters.estimated_diameter_max})`;
        const diameterInMiles = `(${estimatedDiameterInfo.miles.estimated_diameter_min}-${estimatedDiameterInfo.miles.estimated_diameter_max})`;
        const diameterInFeet = `(${estimatedDiameterInfo.feet.estimated_diameter_min}-${estimatedDiameterInfo.feet.estimated_diameter_max})`;


        return (
            <div>
                <h3>{asteroidInfo.name}</h3>
                {asteroidInfo.is_potentially_hazardous_asteroid &&  <div class="alert alert-danger" role="alert">
                                                                        POTENTIALLY HAZARDOUS
                                                                    </div>
                }
                <a href={asteroidInfo.nasa_jpl_url} target='_blank'>Jet Propulsion Lab</a>
                <div>
                    <span>Id:</span>
                    <span>{asteroidInfo.id}</span>
                </div>
                <div>
                    <span>Neoreference Id:</span>
                    <span>{asteroidInfo.neo_reference_id}</span>
                </div>
                <div>
                    <span>Absolute Magnitude (h):</span>
                    <span>{asteroidInfo.absolute_magnitude_h}</span>
                </div>
                <div>
                    <span>Sentry object:</span>
                    <span>{asteroidInfo.is_sentry_object.toString()}</span>
                </div>
                <p>Estimated diameter</p>
                <div className='row'>
                    {/* <p>Estimated diameter</p> */}
                    <div className='col-md-3'>
                        <p>(km):</p>{diameterInKilometers}
                    </div>
                    <div className='col-md-3'>
                        <p>(m):</p>{diameterInMeters}
                    </div>
                    <div className='col-md-3'>
                        <p>(mi):</p>{diameterInMiles}
                    </div>
                    <div className='col-md-3'>
                        <p>(ft):</p>{diameterInFeet}
                    </div>
                    <dl>
                        <dt>
                            Relative velocity
                        </dt>
                        <dd>
                            {asteroidInfo.close_approach_data[0].relative_velocity.kilometers_per_second}(km/s)
                        </dd>
                    </dl>
                    {/* <span>{asteroidInfo.estimated_diameter.kilometers.estimated_diameter_min}</span>
                    <span>Estimated diameter (m):</span>
                    <span>{asteroidInfo.estimated_diameter.meters.estimated_diameter_min}</span>
                    <span>Estimated diameter (mi):</span>
                    <span>{asteroidInfo.estimated_diameter.miles.estimated_diameter_min}</span>
                    <span>Estimated diameter (ft):</span>
                    <span>{asteroidInfo.estimated_diameter.feet.estimated_diameter_min}</span> */}
                </div>
                {/* <div>
                    <span>Estimated diameter (m):</span>
                    <span>{asteroidInfo.estimated_diameter.meters}</span>
                </div>
                <div>
                    <span>Estimated diameter (mi):</span>
                    <span>{asteroidInfo.estimated_diameter.miles}</span>
                </div>
                <div>
                    <span>Estimated diameter (ft):</span>
                    <span>{asteroidInfo.estimated_diameter.feet}</span>
                </div> */}
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
        debugger;
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
        debugger;
        const innerJsx = asteroids.map(asteroid => 
            <li key={asteroid.id}>
                <button className='btn btn-link btn-sm' onClick={this.handleAsteroidSelection.bind(this, asteroid)}>{asteroid.name}</button>
            </li>
        );
        return <ul>{innerJsx}</ul>;
    }
}