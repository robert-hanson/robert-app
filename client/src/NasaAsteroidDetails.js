import React from 'react';

export class NasaAsteroidDetails extends React.Component {

    render(){
        // const diameterUnits = ['kilometers', 'meters', 'miles', 'feet'];
        if (this.state.asteriod)
        {
            const estimatedDiameterInfo = this.props.asteriod.estimated_diameter;
    
            const diameterInKilometers = `(${estimatedDiameterInfo.kilometers.estimated_diameter_min}-${estimatedDiameterInfo.kilometers.estimated_diameter_max})`;
            const diameterInMeters = `(${estimatedDiameterInfo.meters.estimated_diameter_min}-${estimatedDiameterInfo.meters.estimated_diameter_max})`;
            const diameterInMiles = `(${estimatedDiameterInfo.miles.estimated_diameter_min}-${estimatedDiameterInfo.miles.estimated_diameter_max})`;
            const diameterInFeet = `(${estimatedDiameterInfo.feet.estimated_diameter_min}-${estimatedDiameterInfo.feet.estimated_diameter_max})`;
        }

        return (
            this.props.asteroid &&
            <div>
                <h3>{this.props.asteriod.name}</h3>
                {this.props.asteriod.is_potentially_hazardous_asteroid &&  <div class="alert alert-danger" role="alert">
                                                                        POTENTIALLY HAZARDOUS
                                                                    </div>
                }
                <a href={this.props.asteriod.nasa_jpl_url}>Jet Propulsion Lab</a>
                <div>
                    <span>Id:</span>
                    <span>{this.props.asteriod.id}</span>
                </div>
                <div>
                    <span>Neoreference Id:</span>
                    <span>{this.props.asteriod.neo_reference_id}</span>
                </div>
                <div>
                    <span>Absolute Magnitude (h):</span>
                    <span>{this.props.asteriod.absolute_magnitude_h}</span>
                </div>
                <div>
                    <span>Sentry object:</span>
                    <span>{this.props.asteriod.is_sentry_object.toString()}</span>
                </div>
                <p>Estimated diamter</p>
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
                            {this.props.asteriod.close_approach_data[0].relative_velocity.kilometers_per_second}(km/s)
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
}