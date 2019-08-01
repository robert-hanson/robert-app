import React from 'react';
import { NasaOrbitalData } from '../NasaOrbitalData';

export class Neo extends React.Component {

    render() {
        if (this.props.neo){
            const neo = this.props.neo;
            const estimatedDiameterInfo = neo.estimated_diameter;

            const diameterInKilometers = `${estimatedDiameterInfo.kilometers.estimated_diameter_min} - ${estimatedDiameterInfo.kilometers.estimated_diameter_max}`;
            const diameterInMeters = `${estimatedDiameterInfo.meters.estimated_diameter_min} - ${estimatedDiameterInfo.meters.estimated_diameter_max}`;
            const diameterInMiles = `${estimatedDiameterInfo.miles.estimated_diameter_min} - ${estimatedDiameterInfo.miles.estimated_diameter_max}`;
            const diameterInFeet = `${estimatedDiameterInfo.feet.estimated_diameter_min} - ${estimatedDiameterInfo.feet.estimated_diameter_max}`;
    
    
            return (
                <div>
                    <h3 className='text-center'>{neo.name}</h3>
                    {neo.is_potentially_hazardous_asteroid &&  <div className="alert alert-danger" role="alert">
                                                                            POTENTIALLY HAZARDOUS
                                                                        </div>
                    }
                    <div className='row'>
                        <div className='col-sm-6'>
                            <dl>
                                <dt>Id</dt>
                                <dd>{neo.id}</dd>
    
                                <dt>Neoreference Id</dt>
                                <dd>{neo.neo_reference_id}</dd>
    
                                <dt>Absolute Magnitude (h)</dt>
                                <dd>{neo.absolute_magnitude_h}</dd>
                                
                                <dt>Sentry Object</dt>
                                <dd>{neo.is_sentry_object.toString()}</dd>
                                
                                <dt>Oribiting body</dt>
                                <dd>{neo.close_approach_data[0].orbiting_body}</dd>
                            </dl>
                            <a href={neo.nasa_jpl_url} target='_blank'>View Jet Propulsion Lab</a>
                        </div>
                        <div className='col-sm-6'>
                            <dl>
                                <dt>Estimated Diameter</dt>
                                <dd>{diameterInKilometers} (km)</dd>
                                <dd>{diameterInMeters} (m)</dd>
                                <dd>{diameterInMiles} (mi)</dd>
                                <dd>{diameterInFeet} (ft)</dd>
                                
                                <dt>Relative velocity</dt>
                                <dd>{neo.close_approach_data[0].relative_velocity.kilometers_per_second}(km/s)</dd>
                                <dd>{neo.close_approach_data[0].relative_velocity.kilometers_per_hour}(km/h)</dd>
                                <dd>{neo.close_approach_data[0].relative_velocity.miles_per_hour}(mph)</dd>
                                
                                <dt>Miss Distance</dt>
                                <dd>{neo.close_approach_data[0].miss_distance.astronomical}(astronomical)</dd>
                                <dd>{neo.close_approach_data[0].miss_distance.lunar}(lunar)</dd>
                                <dd>{neo.close_approach_data[0].miss_distance.kilometers}(km)</dd>
                                <dd>{neo.close_approach_data[0].miss_distance.miles}(miles)</dd>
                            </dl>
                        </div>
                    </div>
                    <div className='row'>
                        <NasaOrbitalData data={neo.orbital_data} />
                    </div>
                </div>
            );
        } else {
            return <div></div>
        }
    }
}